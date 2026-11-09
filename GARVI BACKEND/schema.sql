-- ==============================================================================
-- GARVI (Gujarat Academic Ratings Visualization for Improvement)
-- Supabase / PostgreSQL Schema Definition
-- ==============================================================================

-- 1. Institutions Table (Stores all GSIRF 2024 evaluated colleges and universities)
CREATE TABLE IF NOT EXISTS institutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  uid VARCHAR(100) UNIQUE NOT NULL,
  inst_id VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_gu VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  sheet_category VARCHAR(100),
  district VARCHAR(100) DEFAULT 'Gujarat',
  aishe VARCHAR(50),
  star INT DEFAULT 2,
  rank INT DEFAULT 999,
  total_score NUMERIC(5,2) DEFAULT 0.00,
  cgpa NUMERIC(4,2) DEFAULT 0.00,
  coordinator VARCHAR(255),
  pillars JSONB NOT NULL DEFAULT '[]'::jsonb,
  sub_parameters JSONB NOT NULL DEFAULT '[]'::jsonb,
  historical_trends JSONB NOT NULL DEFAULT '[]'::jsonb,
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  growth_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Credentials Table (Secure authentication store with bcrypt password hashes)
-- Passwords are NEVER saved in plaintext or exposed to the frontend!
CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'college', -- 'college' | 'admin' | 'reviewer'
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. GSIRF 2026 Data Collection Submissions Table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES institutions(id) ON DELETE CASCADE,
  gsirf_cycle VARCHAR(50) DEFAULT 'GSIRF 2026',
  status VARCHAR(50) DEFAULT 'pending', -- 'pending' | 'accepted' | 'rejected'
  submitted_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  reviewer_remarks TEXT
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_institutions_uid ON institutions(uid);
CREATE INDEX IF NOT EXISTS idx_institutions_category ON institutions(category);
CREATE INDEX IF NOT EXISTS idx_institutions_star ON institutions(star);
CREATE INDEX IF NOT EXISTS idx_credentials_username ON credentials(username);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);

