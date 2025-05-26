// Импортируем необходимые модули
let express = require("express");
let bodyParser = require("body-parser");
let bcrypt = require("bcryptjs"); // Для хеширования паролей
let cors = require("cors"); // для передачи данных между разными доменами
let cookieParser = require("cookie-parser"); // Для работы с cookies
let pool = require("./config/db"); // Подключаем пул соединений из конфига
let jwt = require('jsonwebtoken');
let usersRoutes = require('./routes/users');

// Создаем экземпляр приложения Express
let app = express();

// ----------------------------- НАСТРОЙКА CORS -----------------------------------
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Добавляем поддержку OPTIONS для конкретного маршрута logout
app.options('/api/auth/logout', cors()); // 👈 Это важно!

// ----------------------------- ПАРСИНГ ТЕЛА ЗАПРОСОВ -----------------------------
app.use(bodyParser.json());
app.use(cookieParser());

// ----------------------------- ПОДКЛЮЧАЕМ МАРШРУТЫ --------------------------------
let authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Подключаем роуты пользователей
app.use('/api/users', usersRoutes);

//---------------------------------------------------- РОУТ ДЛЯ РЕГИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ --------------------------------------------------
app.post("/api/register", async (req, res) => {
  let { firstName, lastName, email, phone, password } = req.body;

  try {
    // Хеширование пароля
    let hashedPassword = await bcrypt.hash(password, 10);

    // Вставка данных в таблицу users
    let result = await pool.query(
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

    // ✅ Генерируем JWT
    const token = jwt.sign(
      { userId: user.rows[0].id }, // payload
      process.env.JWT_SECRET || 'secret_key', // секретный ключ
      { expiresIn: '24h' }
    );

    // ✅ Теперь устанавливаем куку
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true только на HTTPS
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 день
      path: '/',
      domain: 'localhost'
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
    // ✅ Удаляем правильную куку 'token'
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0), // прошлое
      path: '/'
    });
    
    res.json({ success: true, message: "Вы успешно вышли из системы" });
  } catch (err) {
    console.error('Ошибка выхода:', err);
    res.status(500).json({ success: false, message: "Ошибка сервера" });
  }
});

//---------------------------------------------------- ЗАПУСК СЕРВЕРА ------------------------------------------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});