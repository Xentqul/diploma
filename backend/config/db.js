const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dressery_db',
  password: 'zxcasdqwe!1234567890',
  port: 5432,
});

// Проверка подключения
pool.query('SELECT NOW() as time')
  .then(res => console.log("Успешно! PostgreSQL подключен. Текущее время:", res.rows[0].time))
  .catch(err => console.error("Ошибка! Ошибка PostgreSQL:", err.message));

module.exports = pool;