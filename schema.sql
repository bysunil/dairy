-- Users Table for Authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    mobile_number TEXT NOT NULL UNIQUE,
    center_name TEXT
);

-- Enable RLS for Users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to read their own data"
ON users FOR SELECT
USING (true); -- In a real app with auth, this would check auth.uid()

CREATE POLICY "Allow public insert for signup"
ON users FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow users to update their own data"
ON users FOR UPDATE
USING (true);

-- Receipts Table
CREATE TABLE IF NOT EXISTS receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    
    -- Extracted JSON schema fields
    center_name TEXT,
    date DATE NOT NULL,
    shift TEXT CHECK (shift IN ('AM', 'PM')) NOT NULL,
    purchase_time TIME,
    producer_name TEXT,
    producer_number INTEGER,
    fat NUMERIC(4, 2),
    snf NUMERIC(4, 2),
    quantity NUMERIC(6, 2) NOT NULL,
    water_percent NUMERIC(4, 2),
    rate NUMERIC(6, 2) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL
);

-- Date and Shift Indexes
CREATE INDEX idx_receipts_date ON receipts(date);
CREATE INDEX idx_receipts_shift ON receipts(shift);
CREATE INDEX idx_receipts_user_id ON receipts(user_id);

-- Enable RLS for Receipts
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access for testing"
ON receipts FOR SELECT
USING (true);

CREATE POLICY "Allow public insert access for testing"
ON receipts FOR INSERT
WITH CHECK (true);
