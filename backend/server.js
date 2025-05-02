const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Для хеширования паролей
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Для работы с cookies
const pool = require("./config/db"); // Подключаем пул соединений из конфига

const app = express();
const PORT = 5000;

// Подключаем маршруты аутентификации
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes); // Теперь маршруты будут доступны как /api/auth/login и т.д.

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

//---------------------------------------------------- НАСТРОЙКА CORS И ПАРСЕРОВ ------------------------------------------------------
// Настройки CORS с явным указанием origin
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

//---------------------------------------------------- РОУТ ДЛЯ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ --------------------------------------------------
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Вставка данных в таблицу users
    const result = await pool.query(
      "INSERT INTO dressery_schema.users (first_name, last_name, email, phone_number, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstName, lastName, email, phone, hashedPassword, "user"]
    );

    // Ответ клиенту
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      // Ошибка уникальности
      res.status(400).send("Электронная почта или номер телефона уже заняты.");
    } else {
      res.status(500).send("Ошибка сервера");
    }
  }
});

//-------------------------------------------------------- РОУТ ДЛЯ ВХОДА ПОЛЬЗОВАТЕЛЯ -----------------------------------------------------
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Находим пользователя по email
    const user = await pool.query(
      "SELECT * FROM dressery_schema.users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    // 2. Проверяем пароль
    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
    
    if (!isValidPassword) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    // 3. Устанавливаем cookie для аутентификации
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // Срок действия - 1 день
    });

    // 4. Возвращаем успешный ответ
    res.json({ 
      success: true,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

//---------------------------------------------------- РОУТ ДЛЯ ВЫХОДА ИЗ АККАУНТА ------------------------------------------------------
app.post("/api/auth/logout", (req, res) => {
  try {
    // Упрощенная очистка cookie
    res.cookie('auth', '', {
      httpOnly: true,
      expires: new Date(0), // Устанавливаем дату в прошлое
      path: '/'
    });
    
    res.json({ success: true, message: "Вы успешно вышли из системы" });
  } catch (err) {
    console.error('Ошибка выхода:', err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});
//---------------------------------------------------- ЗАПУСК СЕРВЕРА ------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});