const { Pool } = require("pg");

// Если DATABASE_URL есть (например, на Render), то Pool использует её.
// можно указать fallback для разработки (необязательно)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Нужно для Render
  },
});

// Проверка подключения
pool.query("SELECT NOW() as time", (err, res) => {
  if (err) {
    console.error("Ошибка подключения к БД:", err.message);
  } else {
    console.log("Успешное подключение к БД. Текущее время:", res.rows[0].time);
  }
});

module.exports = pool;

// ================================= РАЗРАБОТКА =======================================
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'dressery_db',
//   password: 'zxcasdqwe!1234567890',
//   port: 5432,
// });

// // Проверка подключения
// pool.query('SELECT NOW() as time')
//   .then(res => console.log("Успешно! PostgreSQL подключен. Текущее время:", res.rows[0].time))
//   .catch(err => console.error("Ошибка! Ошибка PostgreSQL:", err.message));

// module.exports = pool;