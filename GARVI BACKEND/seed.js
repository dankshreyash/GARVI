const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function runSeed() {
  console.log(' Starting GSIRF 2024 to Supabase / PostgreSQL Seeder...');

  const dataPath = path.join(__dirname, '../GARVI REACT/src/data/gsirfExcelData.json');
  if (!fs.existsSync(dataPath)) {
    console.error('❌ Data file not found:', dataPath);
    process.exit(1);
  }

  const colleges = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(` Found ${colleges.length} institutions in Excel dataset.`);

  // If Supabase JS client is available
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    console.log(' Seeding via Supabase API...');

    for (const college of colleges) {
      // 1. Insert institution
      const { data: instData, error: instError } = await supabase
        .from('institutions')
        .upsert({
          uid: college.uid,
          inst_id: college.instId,
          name: college.name,
          category: college.category,
          sheet_category: college.sheetCategory,
          star: college.star,
          rank: college.rank,
          total_score: college.totalScore,
          cgpa: college.cgpa,
          pillars: college.pillars,
          sub_parameters: college.subParameters,
          historical_trends: college.historicalTrends,
          strengths: college.strengths,
          growth_areas: college.growthAreas
        }, { onConflict: 'uid' })
        .select()
        .single();

      if (instError) {
        console.error(`❌ Error inserting ${college.name}:`, instError.message);
        continue;
      }

      // 2. Hash password and insert into credentials
      const passwordHash = await bcrypt.hash(college.pwd, 10);
      const { error: credError } = await supabase
        .from('credentials')
        .upsert({
          institution_id: instData.id,
          username: college.uid.toLowerCase(),
          password_hash: passwordHash,
          role: 'college'
        }, { onConflict: 'username' });

      if (credError) {
        console.error(`❌ Error inserting credentials for ${college.uid}:`, credError.message);
      }
    }
    console.log(' Supabase seed completed successfully!');
    return;
  }

  // If direct PostgreSQL connection is available
  if (process.env.DATABASE_URL) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    console.log(' Seeding via direct PostgreSQL connection...');

    const client = await pool.connect();
    try {
      // Run schema first
      const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
      await client.query(schemaSql);
      console.log(' Applied schema.sql');

      for (const college of colleges) {
        const passwordHash = await bcrypt.hash(college.pwd, 10);

        const instRes = await client.query(`
          INSERT INTO institutions (
            uid, inst_id, name, category, sheet_category, star, rank, total_score, cgpa,
            pillars, sub_parameters, historical_trends, strengths, growth_areas
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (uid) DO UPDATE SET
            total_score = EXCLUDED.total_score,
            star = EXCLUDED.star,
            rank = EXCLUDED.rank
          RETURNING id;
        `, [
          college.uid,
          college.instId,
          college.name,
          college.category,
          college.sheetCategory,
          college.star,
          college.rank,
          college.totalScore,
          college.cgpa,
          JSON.stringify(college.pillars),
          JSON.stringify(college.subParameters),
          JSON.stringify(college.historicalTrends),
          JSON.stringify(college.strengths),
          JSON.stringify(college.growthAreas)
        ]);

        const instDbId = instRes.rows[0].id;

        await client.query(`
          INSERT INTO credentials (institution_id, username, password_hash, role)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (username) DO UPDATE SET
            password_hash = EXCLUDED.password_hash;
        `, [
          instDbId,
          college.uid.toLowerCase(),
          passwordHash,
          'college'
        ]);
      }
      console.log(' PostgreSQL seed completed successfully!');
    } finally {
      client.release();
      await pool.end();
    }
    return;
  }

  console.log('ℹ️ Neither DATABASE_URL nor SUPABASE_URL was provided in .env.');
  console.log('ℹ️ When you get your Supabase keys, paste them into "GARVI BACKEND/.env" and re-run:');
  console.log('   node seed.js');
}

runSeed().catch((err) => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});

