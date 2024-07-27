import { createClient } from '@supabase/supabase-js'


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
//const supabase = createClient('https://brdpcvomwqyfbjsxakmj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZHBjdm9td3F5ZmJqc3hha21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MzI4NjMsImV4cCI6MjAzNjIwODg2M30.MCS828htPOybQgmVG30ttceLu9SxYjcLFL6u2Va2EYY')
