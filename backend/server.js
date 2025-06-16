require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { createClient } = require('@supabase/supabase-js');

// Инициализация приложения
const app = express();

// Конфигурация Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Конфигурация базы данных PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" 
    ? { rejectUnauthorized: false } 
    : false,
});

// Настройки CORS
const corsOptions = {
  origin: [
    "https://dressery-magazine.ru",
    "https://diploma-nu-nine.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Проверка подключения к БД
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch(err => console.error("❌ DB connection error:", err));

// Роуты
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/subscribes", require("./routes/subscribes"));
app.use("/api/applications", require("./routes/applications"));

// Регистрация пользователя
app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO dressery_schema.users 
       (first_name, last_name, email, phone_number, password_hash, role) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, first_name, last_name, email, phone_number`,
      [firstName, lastName, email, phone, hashedPassword, "user"]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(err.code === "23505" ? 400 : 500).json({
      error: err.code === "23505" 
        ? "Электронная почта или номер телефона уже заняты." 
        : "Ошибка сервера"
    });
  }
});

// Аутентификация пользователя
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows } = await pool.query(
      `SELECT id, first_name, last_name, email, password_hash, avatar 
       FROM dressery_schema.users WHERE email = $1`,
      [email]
    );

    if (rows.length === 0 || !await bcrypt.compare(password, rows[0].password_hash)) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }

    const user = rows[0];
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400000
    });

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Выход из системы
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true });
});

// Проверка здоровья сервера
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    db: pool ? "connected" : "disconnected",
    timestamp: new Date().toISOString() 
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: err.message 
  });
});

// Запуск сервера
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode`);
  console.log(`Listening on port ${PORT}`);
});