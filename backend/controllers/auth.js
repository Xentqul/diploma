const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

module.exports = {
  //------------------------------------------------------------------ МЕТОД РЕГИСТРАЦИИ ----------------------------------------------------------------------
  register: async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO dressery_schema.users (first_name, last_name, email, phone_number, password_hash, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [firstName, lastName, email, phone, hashedPassword, "user"]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      if (err.code === "23505") {
        return res.status(400).send("Email или телефон уже заняты");
      } else {
        console.error("Ошибка регистрации:", err);
        return res.status(500).send("Ошибка сервера");
      }
    }
  },

  //---------------------------------------------------- МЕТОД ВХОДА  ----------------------------------------------------
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Поиск пользователя
      const user = await pool.query(
        "SELECT * FROM dressery_schema.users WHERE email = $1",
        [email]
      );

      if (!user.rows[0]) {
        return res.status(401).json({
          success: false,
          message: "Неверные данные",
        });
      }

      // Проверка пароля
      const isValidPass = await bcrypt.compare(
        password,
        user.rows[0].password_hash
      );
      if (!isValidPass) {
        return res.status(401).json({
          success: false,
          message: "Неверные данные",
        });
      }

      // Генерация токена
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET || "secret_key",
        { expiresIn: "24h" }
      );

      // Установка куки
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' в production
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      });

      // Ответ клиенту с токеном в теле
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
      console.error("Ошибка входа:", err);
      res.status(500).json({
        success: false,
        message: "Ошибка сервера",
      });
    }
  },

  //---------------------------------------------------- ПРОВЕРКА АВТОРИЗАЦИИ ----------------------------------------------------
  checkAuth: async (req, res) => {
    try {
      // Получаем токен из кук
      const token = req.cookies.token;
      
      if (!token) {
        return res.status(200).json({ 
          isAuthenticated: false,
          message: 'Токен отсутствует'
        });
      }

      // Верификация токена
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
      
      // Дополнительно: проверяем существование пользователя в БД
      const user = await pool.query(
        'SELECT id, email, first_name, last_name, avatar FROM dressery_schema.users WHERE id = $1',
        [decoded.userId]
      );

      if (!user.rows[0]) {
        return res.status(200).json({
          isAuthenticated: false,
          message: 'Пользователь не найден'
        });
      }

      // Успешный ответ
      res.status(200).json({
        isAuthenticated: true,
        user: {
          userId: user.rows[0].id,
          email: user.rows[0].email,
          firstName: user.rows[0].first_name,
          lastName: user.rows[0].last_name,
          avatar: user.rows[0].avatar
        }
      });

    } catch (e) {
      console.error('Ошибка проверки авторизации:', e);
      
      // Очищаем невалидную куку
      res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        expires: new Date(0),
        path: '/'
      });

      res.status(200).json({
        isAuthenticated: false,
        message: e.name === 'JsonWebTokenError' ? 'Невалидный токен' : 'Ошибка сервера'
      });
    }
  },

  //---------------------------------------------------- МЕТОД ВЫХОДА ИЗ АККАУНТА ------------------------------------------------------
  logout: async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        expires: new Date(0),
        path: "/",
      });

      res.json({ success: true, message: "Вы успешно вышли из системы" });
    } catch (err) {
      console.error("Ошибка выхода:", err);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  },
};