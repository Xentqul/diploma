require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();

// Конфигурация базы данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'your_default_connection_string',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});



// Список разрешённых доменов

// Настройка CORS
const corsOptions = {
  origin: allowedOrigins,
  credentials: true, // Важно для работы кук
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //allowedHeaders: ['Content-Type', 'Authorization'],
  //exposedHeaders: ['Authorization'],
};

// Применяем middleware
//app.use(cors(corsOptions));
app.use(cors({
    origin: 'https://diploma-nu-nine.vercel.app', // Нельзя использовать "*"!
    credentials: true, // Разрешаем куки и авторизацию
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
//app.options('*', cors(corsOptions)); // preflight для всех маршрутов

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Логирование запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} from ${req.ip}`);
  next();
});

// Проверка подключения к БД
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ Database connection error:', err));

// Роуты
const routers = [
  { path: '/api/auth', router: require('./routes/auth') },
  { path: '/api/users', router: require('./routes/users') },
  { path: '/api/subscribes', router: require('./routes/subscribes') },
  { path: '/api/applications', router: require('./routes/applications') },
];

routers.forEach(({ path, router }) => {
  app.use(path, router);
  console.log(`🛣️ Route ${path} initialized`);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    db: pool ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);

  if (err.message === 'CORS blocked: origin not allowed') {
    return res.status(403).json({
      error: 'CORS policy violation',
      allowedOrigins,
    });
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
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

    const isValidPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' в production
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
    // Устанавливаем заголовки CORS перед обработкой
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Credentials", "true");
    }

    // Удаляем куку
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true в production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // согласовано с настройками login
      expires: new Date(0), // моментальное истечение
      path: "/",
    });

    res.json({ success: true, message: "Вы успешно вышли из системы" });
  } catch (err) {
    console.error("Ошибка выхода:", err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

//---------------------------------------------------- ЗАПУСК СЕРВЕРА ------------------------------------------------------
const PORT = process.env.PORT || 10000; 
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`Listening on http://${HOST}:${PORT}`);
});
