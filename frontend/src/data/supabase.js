import { createClient } from '@supabase/supabase-js';

// Конфигурация из панели Supabase (Settings -> API)
const supabaseUrl = 'https://rkasdtpiqqtczeazhruc.supabase.co'; // Без /storage/v1/s3
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYXNkdHBpcXF0Y3plYXpocnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5ODczMTEsImV4cCI6MjA2NTU2MzMxMX0._U5lGwv9I3pPgHdTsv14cEDDmYZA2LnoZVVxduLv98E'; // Полный anon public ключ

// Создаем и экспортируем клиент
export const supabase = createClient(supabaseUrl, supabaseAnonKey);