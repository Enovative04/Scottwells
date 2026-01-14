
import { createClient } from '@supabase/supabase-js';

/**
 * SQL SETUP FOR SUPABASE:
 * 1. Go to SQL Editor in Supabase.
 * 2. Run the following code to create your Admin table:
 * 
 * CREATE TABLE IF NOT EXISTS admins (
 *     id SERIAL PRIMARY KEY,
 *     username TEXT UNIQUE NOT NULL,
 *     password TEXT NOT NULL,
 *     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * INSERT INTO admins (username, password) 
 * VALUES ('admin', 'password123')
 * ON CONFLICT (username) DO NOTHING;
 * 
 * ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Allow public read" ON admins FOR SELECT USING (true);
 */

const supabaseUrl = 'https://cwoxqvrpluojevyhvozj.supabase.co';
const supabaseAnonKey = 'sb_publishable_2oEoEDObrBDx4ZgEbI50dw_W7zlKbn5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
