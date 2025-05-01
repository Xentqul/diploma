const express = require('express');
const { Pool } = require('pg'); // Для работы с PostgreSQL
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // Для хеширования паролей
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Разрешаем запросы из React
app.use(bodyParser.json());

// Настройка подключения к PostgreSQL
const pool = new Pool({
    user: 'postgres', // Имя пользователя
    host: 'localhost', // Адрес сервера
    database: 'dressery_db', // Название базы данных
    password: 'zxcasdqwe!1234567890', // Пароль от PostgreSQL
    port: 5432, // Порт PostgreSQL
});

// Роут для регистрации пользователя
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Вставка данных в таблицу users
        const result = await pool.query(
            'INSERT INTO dressery_schema.users (first_name, last_name, email, phone_number, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [firstName, lastName, email, phone, hashedPassword, 'user']
        );

        // Ответ клиенту
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        if (err.code === '23505') { // Ошибка уникальности
            res.status(400).send('Электронная почта или номер телефона уже заняты.');
        } else {
            res.status(500).send('Ошибка сервера');
        }
    }
});
console.log("Проверяем подключение к PostgreSQL...");

pool.query('SELECT NOW() as time')
  .then(res => console.log("✅ PostgreSQL отвечает. Текущее время:", res.rows[0].time))
  .catch(err => console.error("❌ Ошибка PostgreSQL:", err.message));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});