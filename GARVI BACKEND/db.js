const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

let supabase = null;
let pgPool = null;

// Initialize Supabase client if keys are provided
if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
  try {
    supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    console.log(' Connected to Supabase via JavaScript Client');
  } catch (e) {
    console.error('Supabase init error:', e.message);
  }
}

// Initialize PostgreSQL pool if DATABASE_URL is provided
if (process.env.DATABASE_URL) {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
    console.log(' Connected to PostgreSQL via pg Pool');
  } catch (e) {
    console.error('PostgreSQL init error:', e.message);
  }
}

/**
 * Institutional dataset & pre-hashed credential store
 */
let inMemoryInstitutions = [];
const credentialsCache = new Map();

try {
  const dataPath = path.join(__dirname, '../GARVI REACT/src/data/gsirfExcelData.json');
  if (fs.existsSync(dataPath)) {
    inMemoryInstitutions = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(` Loaded ${inMemoryInstitutions.length} institutions from GSIRF Excel dataset`);
  }
} catch (err) {
  console.error('Warning loading backup Excel dataset:', err.message);
}

// Helper to verify or hash password on-demand (O(1) cached)
async function verifyPassword(inputPassword, college) {
  const key = college.uid.toLowerCase();
  let hash = credentialsCache.get(key);
  if (!hash) {
    hash = await bcrypt.hash(college.pwd || 'GSIRF#2026', 10);
    credentialsCache.set(key, hash);
  }
  return bcrypt.compare(inputPassword, hash);
}

module.exports = {
  supabase,
  pgPool,
  inMemoryInstitutions,
  verifyPassword
};
