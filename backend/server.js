require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

// Конфигурация базы данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// CORS настройки
const corsOptions = {
  origin: [
    'https://diploma-nu-nine.vercel.app',
    'https://diploma-od66.onrender.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Проверка подключения к БД
pool.connect()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Основные API роуты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/subscribes', require('./routes/subscribes'));
app.use('/api/applications', require('./routes/applications'));

// Регистрация пользователя
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO dressery_schema.users (first_name, last_name, email, phone_number, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [firstName, lastName, email, phone, hashedPassword, "user"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.code === "23505" ? 400 : 500)
       .send(err.code === "23505" 
         ? "Электронная почта или номер телефона уже заняты." 
         : "Ошибка сервера");
  }
});

// Аутентификация пользователя
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM dressery_schema.users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 86400000, // 24 часа
      path: "/",
    });

    res.json({
      success: true,
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
        avatar: user.rows[0].avatar,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Выход из системы
app.post("/api/auth/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
    path: "/",
  });
  res.json({ success: true, message: "Вы успешно вышли из системы" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ 
    success: false,
    message: "Internal Server Error" 
  });
});

// Запуск сервера
const PORT = process.env.PORT || 10000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`Listening on http://${HOST}:${PORT}`);
});
