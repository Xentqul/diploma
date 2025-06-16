import { createClient } from '@supabase/supabase-js';

// Получите эти значения из: 
// Supabase Dashboard → Project Settings → API
const supabaseUrl = 'https://rkasdtpiqqtczeazhruc.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYXNkdHBpcXF0Y3plYXpocnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODczMTEsImV4cCI6MjA2NTU2MzMxMX0._U5lGwv9I3pPgHdTsv14cEDDmYZA2LnoZVVxduLv98E';

// Создаем клиент
export const supabase = createClient(supabaseUrl, supabaseAnonKey);