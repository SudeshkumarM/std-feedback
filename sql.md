# Supabase Database Setup

Copy and paste the following SQL commands into your Supabase SQL Editor to set up the necessary tables for the **Student Feedback System**.

### 1. Create Tables

```sql
-- Users Table: Stores registration details for Students and Staff
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

-- Feedback Table: Stores evaluations submitted by students
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
```

### 2. Security Configuration (Row Level Security)

By default, these policies allow the application to read and write data during the development phase.

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Development Policies: Allow all operations (For Demo Purposes)
CREATE POLICY "Allow public read-write for users" ON users FOR ALL USING (true);
CREATE POLICY "Allow public read-write for feedback" ON feedback FOR ALL USING (true);
```

### 3. How to Apply

1. Log in to your [Supabase Dashboard](https://app.supabase.com/).
2. Select your project.
3. Click on the **SQL Editor** icon in the left sidebar.
4. Click **New Query**.
5. Paste the code above and click **Run**.
