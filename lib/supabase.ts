import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://veutdehnfcuzkkazbwzi.supabase.co' as string // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldXRkZWhuZmN1emtrYXpid3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2MTQwOTAsImV4cCI6MjA0NzE5MDA5MH0.MXa1fHS-BAM22kk0gVmvztO6SvqUCvLI7CNwYKlAciI" as string // Replace with your Supabase anon key
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase, supabaseUrl }; // Export supabaseUrl explicitly
export default supabase;
