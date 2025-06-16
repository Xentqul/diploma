const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('SUPABASE_URL:', supabaseUrl); // Для проверки
console.log('SUPABASE_KEY:', supabaseKey); // Для проверки

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials are missing in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;