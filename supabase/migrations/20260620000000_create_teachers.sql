-- SQL Migration: Create Teachers, Availability, and Reviews Tables

-- 1. Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  title TEXT NOT NULL, -- e.g., "Ustadz", "Ustazah"
  avatar_url TEXT,
  bio TEXT NOT NULL,
  education TEXT NOT NULL, -- education/sanad
  is_verified BOOLEAN DEFAULT false,
  specialties TEXT[] NOT NULL DEFAULT '{}', -- e.g., ["Iqra 1-6", "Tahsin", "Tahfidz"]
  years_experience INT NOT NULL DEFAULT 0,
  total_students INT NOT NULL DEFAULT 0,
  rating_avg NUMERIC DEFAULT 0,
  rating_count INT DEFAULT 0,
  price_per_session NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create availability table
CREATE TABLE IF NOT EXISTS teacher_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  day_of_week INT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6), -- 0 = Minggu, 1 = Senin, ...
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_blocked BOOLEAN DEFAULT false
);

-- 3. Create reviews table
CREATE TABLE IF NOT EXISTS teacher_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  parent_id UUID NOT NULL, -- FK to auth.users (handled via auth schema link)
  parent_name TEXT NOT NULL DEFAULT 'Orang Tua',
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_reviews ENABLE ROW LEVEL SECURITY;

-- 5. Define RLS Policies

-- Teachers table policies
CREATE POLICY "Allow public read access to teachers" 
  ON teachers FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow teachers to update their own profile" 
  ON teachers FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

-- Availability table policies
CREATE POLICY "Allow public read access to availability" 
  ON teacher_availability FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow teachers to manage their own availability" 
  ON teacher_availability FOR ALL 
  TO authenticated 
  USING (auth.uid() = teacher_id);

-- Reviews table policies
CREATE POLICY "Allow public read access to reviews" 
  ON teacher_reviews FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Allow parents to insert reviews" 
  ON teacher_reviews FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = parent_id);
