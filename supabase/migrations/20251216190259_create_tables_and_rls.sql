/*
  # Create Computer 4 Kids Database Schema
  
  1. New Tables
    - `children`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users, nullable for guest accounts)
      - `name` (text)
      - `hand_preference` (text: 'left' or 'right')
      - `computer_type` (text: 'mac' or 'pc')
      - `selected_avatar` (text)
      - `career_role` (text, nullable)
      - `xp` (integer, default 0)
      - `level` (integer, default 1)
      - `current_streak` (integer, default 0)
      - `longest_streak` (integer, default 0)
      - `age_group` (text, default '5-7')
      - `total_play_time` (integer, default 0)
      - `last_login_date` (date, nullable)
      - `created_at` (timestamptz)
      - `last_active` (timestamptz)
      
    - `lessons`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `lesson_number` (integer)
      - `description` (text, nullable)
      - `computer_type` (text, default 'all')
      - `content` (jsonb, nullable)
      - `created_at` (timestamptz)
      
    - `progress`
      - `id` (uuid, primary key)
      - `child_id` (uuid, foreign key to children)
      - `lesson_id` (uuid, foreign key to lessons)
      - `completed` (boolean, default false)
      - `score` (integer, default 0)
      - `attempts` (integer, default 0)
      - `time_spent` (integer, default 0)
      - `completed_at` (timestamptz, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - Unique constraint on (child_id, lesson_id)
      
    - `settings`
      - `id` (uuid, primary key)
      - `child_id` (uuid, foreign key to children, unique)
      - `audio_enabled` (boolean, default true)
      - `text_size` (text, default 'medium')
      - `difficulty_level` (integer, default 1)
      - `screen_time_limit` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `daily_rewards`
      - `id` (uuid, primary key)
      - `child_id` (uuid, foreign key to children)
      - `reward_date` (date)
      - `xp_earned` (integer, default 10)
      - `created_at` (timestamptz)
      - Unique constraint on (child_id, reward_date)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and guest access
    - Guest users can only access their own child profile
    - Authenticated users can access all their children
*/

-- Create children table
CREATE TABLE IF NOT EXISTS children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NULL,
  name text NOT NULL,
  hand_preference text DEFAULT 'right' CHECK (hand_preference IN ('left', 'right')),
  computer_type text DEFAULT 'pc' CHECK (computer_type IN ('mac', 'pc')),
  selected_avatar text DEFAULT 'robot',
  career_role text NULL,
  xp integer DEFAULT 0,
  level integer DEFAULT 1,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  age_group text DEFAULT '5-7',
  total_play_time integer DEFAULT 0,
  last_login_date date NULL,
  created_at timestamptz DEFAULT now(),
  last_active timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  lesson_number integer NOT NULL,
  description text NULL,
  computer_type text DEFAULT 'all',
  content jsonb NULL,
  created_at timestamptz DEFAULT now()
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  score integer DEFAULT 0,
  attempts integer DEFAULT 0,
  time_spent integer DEFAULT 0,
  completed_at timestamptz NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (child_id, lesson_id)
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid REFERENCES children(id) ON DELETE CASCADE NOT NULL UNIQUE,
  audio_enabled boolean DEFAULT true,
  text_size text DEFAULT 'medium' CHECK (text_size IN ('small', 'medium', 'large')),
  difficulty_level integer DEFAULT 1,
  screen_time_limit integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create daily_rewards table
CREATE TABLE IF NOT EXISTS daily_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id uuid REFERENCES children(id) ON DELETE CASCADE NOT NULL,
  reward_date date NOT NULL,
  xp_earned integer DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  UNIQUE (child_id, reward_date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_children_user_id ON children(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category);
CREATE INDEX IF NOT EXISTS idx_lessons_lesson_number ON lessons(lesson_number);
CREATE INDEX IF NOT EXISTS idx_progress_child_id ON progress(child_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson_id ON progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_daily_rewards_child_id ON daily_rewards(child_id);
CREATE INDEX IF NOT EXISTS idx_daily_rewards_date ON daily_rewards(reward_date);

-- Enable Row Level Security
ALTER TABLE children ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_rewards ENABLE ROW LEVEL SECURITY;

-- Children policies
CREATE POLICY "Users can view their own children"
  ON children FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view guest children"
  ON children FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Users can create their own children"
  ON children FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can create guest children"
  ON children FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can update their own children"
  ON children FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can update guest children"
  ON children FOR UPDATE
  TO anon
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Users can delete their own children"
  ON children FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Lessons policies (public read access)
CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO anon, authenticated
  USING (true);

-- Progress policies
CREATE POLICY "Authenticated users can view progress of their children"
  ON progress FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view progress for guest children"
  ON progress FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id IS NULL
    )
  );

CREATE POLICY "Authenticated users can insert progress for their children"
  ON progress FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert progress for guest children"
  ON progress FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id IS NULL
    )
  );

CREATE POLICY "Authenticated users can update progress for their children"
  ON progress FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can update progress for guest children"
  ON progress FOR UPDATE
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id IS NULL
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = progress.child_id
      AND children.user_id IS NULL
    )
  );

-- Settings policies
CREATE POLICY "Authenticated users can view settings for their children"
  ON settings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view settings for guest children"
  ON settings FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id IS NULL
    )
  );

CREATE POLICY "Authenticated users can insert settings for their children"
  ON settings FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert settings for guest children"
  ON settings FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id IS NULL
    )
  );

CREATE POLICY "Authenticated users can update settings for their children"
  ON settings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can update settings for guest children"
  ON settings FOR UPDATE
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id IS NULL
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = settings.child_id
      AND children.user_id IS NULL
    )
  );

-- Daily rewards policies
CREATE POLICY "Authenticated users can view rewards for their children"
  ON daily_rewards FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = daily_rewards.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view rewards for guest children"
  ON daily_rewards FOR SELECT
  TO anon
  USING (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = daily_rewards.child_id
      AND children.user_id IS NULL
    )
  );

CREATE POLICY "Authenticated users can insert rewards for their children"
  ON daily_rewards FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = daily_rewards.child_id
      AND children.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert rewards for guest children"
  ON daily_rewards FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM children
      WHERE children.id = daily_rewards.child_id
      AND children.user_id IS NULL
    )
  );
