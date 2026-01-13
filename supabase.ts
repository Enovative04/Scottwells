
import { createClient } from '@supabase/supabase-js';

/**
 * SCOTTWELLS SUPABASE CONFIGURATION
 * 
 * IF YOU GET "row violates row-level security policy":
 * 1. Go to Supabase Dashboard > SQL Editor
 * 2. Run this command:
 *    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
 *    CREATE POLICY "Allow public select" ON "public"."products" FOR SELECT USING (true);
 *    CREATE POLICY "Allow public insert" ON "public"."products" FOR INSERT WITH CHECK (true);
 */

const supabaseUrl = 'https://cwoxqvrpluojevyhvozj.supabase.co';
const supabaseAnonKey = 'sb_publishable_2oEoEDObrBDx4ZgEbI50dw_W7zlKbn5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
