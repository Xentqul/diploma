require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg"); // Добавьте эту строку

// Сначала создаем экземпляр приложения
const app = express();

// ----------------------------- НАСТРОЙКА БАЗЫ ДАННЫХ -----------------------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// ----------------------------- НАСТРОЙКА CORS -----------------------------------
const allowedOrigins = [
  'https://diploma-nu-nine.vercel.app',
  'https://dressery-magazine.ru',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === 'development' || !origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization', 'Set-Cookie']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// ----------------------------- MIDDLEWARES -----------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Логгер запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Проверка подключения к БД при старте
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("Database connection error:", err));

// ----------------------------- ПОДКЛЮЧЕНИЕ РОУТОВ -----------------------------
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const subscribesRouter = require("./routes/subscribes");
const applicationsRouter = require("./routes/applications");

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/subscribes", subscribesRouter);
app.use("/api/applications", applicationsRouter);

// ----------------------------- HEALTH CHECK -----------------------------
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    db: pool ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// ----------------------------- ОБРАБОТКА ОШИБОК -----------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  
  res.status(500).json({ error: 'Internal Server Error' });
});


//---------------------------------------------------- РОУТ ДЛЯ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ --------------------------------------------------
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
    if (err.code === "23505") {
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
      secure: process.env.NODE_ENV !== "development", // false в dev
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
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

//---------------------------------------------------- РОУТ ДЛЯ ВЫХОДА ИЗ АККАУНТА ------------------------------------------------------
app.post("/api/auth/logout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    res.json({ success: true, message: "Вы успешно вышли из системы" });
  } catch (err) {
    console.error("Ошибка выхода:", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

//---------------------------------------------------- ЗАПУСК СЕРВЕРА ------------------------------------------------------
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Listening on http://${HOST}:${PORT}`);
});