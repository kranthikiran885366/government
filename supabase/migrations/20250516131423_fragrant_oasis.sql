/*
  # Initial schema setup for GovWatch

  1. New Tables
    - `leaders` - Store information about government leaders
    - `projects` - Track government projects
    - `spending` - Track government spending
    - `agriculture_prices` - Store crop prices
    - `issues` - Store reported issues
    - `feedback` - Store community feedback

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Leaders table
CREATE TABLE IF NOT EXISTS leaders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  constituency text NOT NULL,
  party text NOT NULL,
  image_url text,
  rating numeric DEFAULT 0,
  attendance_rate numeric DEFAULT 0,
  bills_proposed integer DEFAULT 0,
  promises_kept integer DEFAULT 0,
  promises_total integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  budget numeric NOT NULL,
  spent numeric DEFAULT 0,
  status text DEFAULT 'planned',
  start_date timestamptz,
  end_date timestamptz,
  department text NOT NULL,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Spending table
CREATE TABLE IF NOT EXISTS spending (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  amount numeric NOT NULL,
  description text,
  date timestamptz DEFAULT now(),
  department text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Agriculture prices table
CREATE TABLE IF NOT EXISTS agriculture_prices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name text NOT NULL,
  category text NOT NULL,
  government_price numeric NOT NULL,
  market_price numeric NOT NULL,
  unit text NOT NULL,
  price_change numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Issues table
CREATE TABLE IF NOT EXISTS issues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location text,
  status text DEFAULT 'pending',
  is_anonymous boolean DEFAULT false,
  evidence_urls text[],
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic text NOT NULL,
  content text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  upvotes integer DEFAULT 0,
  downvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE leaders ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE spending ENABLE ROW LEVEL SECURITY;
ALTER TABLE agriculture_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to leaders"
  ON leaders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to projects"
  ON projects FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to spending"
  ON spending FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to agriculture prices"
  ON agriculture_prices FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create issues"
  ON issues FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow users to read their own issues"
  ON issues FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    (is_anonymous = false AND status = 'resolved')
  );

CREATE POLICY "Allow authenticated users to create feedback"
  ON feedback FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow public read access to feedback"
  ON feedback FOR SELECT
  TO public
  USING (true);

-- Create functions for real-time updates
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_leaders_updated_at
  BEFORE UPDATE ON leaders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_issues_updated_at
  BEFORE UPDATE ON issues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();