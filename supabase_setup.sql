-- Student Feedback System Table Structures

-- Users Table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  fullname TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT CHECK (role IN ('student', 'staff')) NOT NULL,
  register_number TEXT,
  staff_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feedback Table
CREATE TABLE feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  department TEXT NOT NULL,
  staff_name TEXT NOT NULL,
  subject TEXT NOT NULL,
  rating_teaching TEXT CHECK (rating_teaching IN ('Good', 'Average', 'Best')) NOT NULL,
  rating_coaching TEXT CHECK (rating_coaching IN ('Good', 'Average', 'Best')) NOT NULL,
  rating_explanation TEXT CHECK (rating_explanation IN ('Good', 'Average', 'Best')) NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 0 AND overall_rating <= 100),
  comment TEXT,
  reply TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Optional, but recommended for security)
-- For this simple example, we'll allow public access if no specific auth is setup, 
-- but in a real app, you'd use Supabase Auth.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-write for demo" ON users FOR ALL USING (true);
CREATE POLICY "Allow public read-write for demo" ON feedback FOR ALL USING (true);
