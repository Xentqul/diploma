// Импортируем необходимые модули
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Для хеширования паролей
const cors = require("cors"); // для передачи данных между разными доменами
const cookieParser = require("cookie-parser"); // Для работы с cookies
const path = require("path"); // Для работы с путями файлов
const jwt = require("jsonwebtoken");

// ----------------------------- НАСТРОЙКА БАЗЫ ДАННЫХ -----------------------------
const { Pool } = require("pg");

// Создаём пул соединений с БД
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// Создаем экземпляр приложения Express
const app = express();

// ----------------------------- НАСТРОЙКА CORS -----------------------------------
app.use(
  cors({
    origin: [
      "https://dressery-magazine.ru",
      "https://diploma-nu-nine.vercel.app/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ----------------------------- ПАРСИНГ ТЕЛА ЗАПРОСОВ -----------------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------------- ОБРАБОТКА СТАТИЧЕСКИХ ФАЙЛОВ ----------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------------- ПОДКЛЮЧАЕМ МАРШРУТЫ --------------------------------
// Импортируем роуты после инициализации app
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Подключение подписки
app.use("/api", require("./routes/subscribes"));
// Подключение заявки на устройство на работу
app.use("/api", require("./routes/applications"));

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
      secure: true,
      sameSite: "lax",
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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
