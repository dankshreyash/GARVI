const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {
  supabase,
  pgPool,
  inMemoryInstitutions,
  verifyPassword
} = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'garvi_secure_fallback_secret_2026';

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GARVI PostgreSQL Supabase Backend',
    dbConnected: Boolean(supabase || pgPool),
    institutionsLoaded: inMemoryInstitutions.length,
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/auth/login
 * Validates credentials against PostgreSQL Supabase.
 * Returns JWT token and sanitized institution data.
 * NEVER returns password or password_hash to the client!
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Try Supabase JS client if configured
    if (supabase) {
      try {
        const { data: cred, error: credErr } = await supabase
          .from('credentials')
          .select('*, institutions(*)')
          .eq('username', cleanUsername)
          .eq('is_active', true)
          .single();

        if (!credErr && cred) {
          const passwordMatches = await bcrypt.compare(cleanPassword, cred.password_hash);
          if (passwordMatches) {
            const inst = cred.institutions;
            const token = jwt.sign(
              { id: cred.id, username: cred.username, role: cred.role, instId: inst.uid },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            supabase.from('credentials').update({ last_login: new Date() }).eq('id', cred.id);

            return res.json({
              message: 'Authentication successful',
              token,
              institution: {
                uid: inst.uid,
                name: inst.name,
                nameGu: inst.name_gu,
                instId: inst.inst_id,
                category: inst.category,
                star: inst.star,
                rank: inst.rank,
                totalScore: Number(inst.total_score),
                cgpa: Number(inst.cgpa),
                pillars: inst.pillars,
                subParameters: inst.sub_parameters,
                historicalTrends: inst.historical_trends,
                strengths: inst.strengths,
                growthAreas: inst.growth_areas
              }
            });
          }
        }
      } catch (sbErr) {
        console.warn('Supabase auth attempt skipped:', sbErr.message);
      }
    }

    // 2. Try PostgreSQL Pool if configured
    if (pgPool) {
      try {
        const query = `
          SELECT c.*, i.uid as inst_uid, i.name as inst_name, i.name_gu as inst_name_gu,
                 i.inst_id, i.category, i.star, i.rank, i.total_score, i.cgpa,
                 i.pillars, i.sub_parameters, i.historical_trends, i.strengths, i.growth_areas
          FROM credentials c
          JOIN institutions i ON c.institution_id = i.id
          WHERE LOWER(c.username) = $1 AND c.is_active = TRUE
          LIMIT 1;
        `;
        const result = await pgPool.query(query, [cleanUsername]);
        if (result.rows.length > 0) {
          const cred = result.rows[0];
          const passwordMatches = await bcrypt.compare(cleanPassword, cred.password_hash);
          if (passwordMatches) {
            const token = jwt.sign(
              { id: cred.id, username: cred.username, role: cred.role, instId: cred.inst_uid },
              JWT_SECRET,
              { expiresIn: '7d' }
            );

            pgPool.query('UPDATE credentials SET last_login = NOW() WHERE id = $1', [cred.id]);

            return res.json({
              message: 'Authentication successful',
              token,
              institution: {
                uid: cred.inst_uid,
                name: cred.inst_name,
                nameGu: cred.inst_name_gu,
                instId: cred.inst_id,
                category: cred.category,
                star: cred.star,
                rank: cred.rank,
                totalScore: Number(cred.total_score),
                cgpa: Number(cred.cgpa),
                pillars: cred.pillars,
                subParameters: cred.sub_parameters,
                historicalTrends: cred.historical_trends,
                strengths: cred.strengths,
                growthAreas: cred.growth_areas
              }
            });
          }
        }
      } catch (pgErr) {
        console.warn('Postgres auth attempt skipped:', pgErr.message);
      }
    }

    // 3. Fallback: Authenticate against in-memory dataset with bcrypt verification
    const inst = inMemoryInstitutions.find((i) => i.uid.toLowerCase() === cleanUsername);
    if (inst) {
      const passwordMatches = await verifyPassword(cleanPassword, inst);
      if (passwordMatches) {
        const token = jwt.sign(
          { username: inst.uid, role: 'college', instId: inst.uid },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        // Sanitize response: strip raw password
        const { pwd, ...safeInst } = inst;
        return res.json({
          message: 'Authentication successful',
          token,
          institution: safeInst
        });
      }
    }

    return res.status(401).json({ error: 'Invalid username or password' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server authentication error' });
  }
});

/**
 * GET /api/institutions
 * Public list of institutions with aggregated ratings (no passwords!)
 */
app.get('/api/institutions', async (req, res) => {
  try {
    const list = inMemoryInstitutions.map((i) => ({
      uid: i.uid,
      instId: i.instId,
      name: i.name,
      category: i.category,
      star: i.star,
      rank: i.rank,
      totalScore: i.totalScore,
      cgpa: i.cgpa
    }));
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch institutions' });
  }
});

/**
 * GET /api/institutions/:uid
 * Returns complete Recharts analytical metrics for a specific institution
 */
app.get('/api/institutions/:uid', async (req, res) => {
  try {
    const targetUid = req.params.uid.toLowerCase();
    const inst = inMemoryInstitutions.find((i) => i.uid.toLowerCase() === targetUid);
    if (!inst) {
      return res.status(404).json({ error: 'Institution not found' });
    }
    const { pwd, ...safeInst } = inst;
    res.json(safeInst);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch institution' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` GARVI Supabase PostgreSQL Backend running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Login endpoint: http://localhost:${PORT}/api/auth/login`);
  console.log(`=======================================================`);
});
