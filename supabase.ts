
import { createClient } from '@supabase/supabase-js';

/**
 * SCOTTWELLS SUPABASE CONFIGURATION
 * 
 * 1. OPEN YOUR SUPABASE DASHBOARD
 * 2. GO TO THE SQL EDITOR
 * 3. PASTE AND RUN THE FOLLOWING CODE:
 * 
 *    -- Create products table
 *    CREATE TABLE IF NOT EXISTS products (
 *        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *        name TEXT NOT NULL,
 *        price NUMERIC NOT NULL,
 *        description TEXT,
 *        image_url TEXT,
 *        status TEXT DEFAULT 'Available',
 *        tags TEXT[],
 *        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 *    );
 * 
 *    -- Create admins table for login
 *    CREATE TABLE IF NOT EXISTS admins (
 *        id SERIAL PRIMARY KEY,
 *        username TEXT UNIQUE NOT NULL,
 *        password TEXT NOT NULL,
 *        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 *    );
 * 
 *    -- Insert your admin credentials
 *    -- USERNAME: admin | PASSWORD: password123 (You can change these here)
 *    INSERT INTO admins (username, password) 
 *    VALUES ('admin', 'password123')
 *    ON CONFLICT (username) DO NOTHING;
 * 
 *    -- Enable Row Level Security (RLS)
 *    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
 *    ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
 * 
 *    -- Create Access Policies
 *    CREATE POLICY "Allow public select on products" ON products FOR SELECT USING (true);
 *    CREATE POLICY "Allow public insert on products" ON products FOR INSERT WITH CHECK (true);
 *    CREATE POLICY "Allow public delete on products" ON products FOR DELETE USING (true);
 *    CREATE POLICY "Allow public select on admins" ON admins FOR SELECT USING (true);
 */

const supabaseUrl = 'https://cwoxqvrpluojevyhvozj.supabase.co';
// Note: Ensure this is your public "anon" key from Supabase API settings
const supabaseAnonKey = 'sb_publishable_2oEoEDObrBDx4ZgEbI50dw_W7zlKbn5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
