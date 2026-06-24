-- SQL Migration: Create Teacher Applications Table & Storage Bucket

-- 1. Create teacher_applications table
CREATE TABLE IF NOT EXISTS teacher_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL, -- Link to auth user if logged in
  full_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email TEXT NOT NULL,
  institution TEXT NOT NULL,
  specialties TEXT[] NOT NULL DEFAULT '{}',
  cv_url TEXT NOT NULL,
  certificate_url TEXT,
  skck_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_review', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create storage bucket for teacher documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('teacher-docs', 'teacher-docs', false)
ON CONFLICT (id) DO NOTHING;

-- 3. Enable RLS
ALTER TABLE teacher_applications ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for teacher_applications
-- Allow anyone to insert (public sign up)
CREATE POLICY "Allow public inserts on applications"
  ON teacher_applications FOR INSERT
  WITH CHECK (true);

-- Allow applicants to read their own application, and admins to read everything
CREATE POLICY "Allow select own or admin applications"
  ON teacher_applications FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id 
    OR (auth.jwt() ->> 'email') LIKE '%admin%' -- Simple admin check
  );

-- 5. RLS Policies for storage.objects in teacher-docs bucket
-- Allow public uploads to teacher-docs
CREATE POLICY "Allow uploads to teacher-docs"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'teacher-docs');

-- Allow applicants to read their own uploaded files or admin to read everything
CREATE POLICY "Allow read own docs or admin from teacher-docs"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'teacher-docs' 
    AND (
      (substring(name from '^[^/]+') = auth.uid()::text) 
      OR (auth.jwt() ->> 'email') LIKE '%admin%'
    )
  );
