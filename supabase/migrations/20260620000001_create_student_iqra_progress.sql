-- SQL Migration: Create Student Iqra Progress Table and Policies

-- 1. Create student_iqra_progress table
CREATE TABLE IF NOT EXISTS student_iqra_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id TEXT NOT NULL UNIQUE, -- Supports both uuid and simulated string IDs like 'child_1'
  current_jilid INT NOT NULL DEFAULT 1 CHECK (current_jilid BETWEEN 1 AND 6),
  passed_jilid INT[] NOT NULL DEFAULT '{}',
  passed_at JSONB DEFAULT '{}'::jsonb, -- e.g., {"1": "2026-06-20T17:28:15Z"}
  passed_by JSONB DEFAULT '{}'::jsonb, -- e.g., {"1": "teacher_uuid"}
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE student_iqra_progress ENABLE ROW LEVEL SECURITY;

-- 3. Define RLS Policies

-- Policy: Students can view their own iqra progress
CREATE POLICY "Allow students to view own iqra progress"
  ON student_iqra_progress FOR SELECT
  TO authenticated
  USING (auth.uid()::text = student_id);

-- Policy: Teachers can view all student iqra progress
CREATE POLICY "Allow teachers to view all iqra progress"
  ON student_iqra_progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers WHERE id::text = auth.uid()::text
    )
  );

-- Policy: Teachers can insert or update student iqra progress
CREATE POLICY "Allow teachers to update student iqra progress"
  ON student_iqra_progress FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM teachers WHERE id::text = auth.uid()::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM teachers WHERE id::text = auth.uid()::text
    )
  );
