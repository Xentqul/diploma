const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://rkasdtpiqqtczeazhruc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYXNkdHBpcXF0Y3plYXpocnVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTk4NzMxMSwiZXhwIjoyMDY1NTYzMzExfQ.m79HuBjD24Tf95DcMCByeFj_Temm7dHUbkWDs49pzkU'; // Из Settings -> API

module.exports = createClient(supabaseUrl, supabaseKey);