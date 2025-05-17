const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db"); // ✅ Правильный путь

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
        res.status(400).send("Email или телефон уже заняты");
      } else {
        res.status(500).send("Ошибка сервера");
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
          message: "Неверные данные" 
        });
      }

      // Проверка пароля
      const isValidPass = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isValidPass) {
        return res.status(401).json({ 
          success: false, 
          message: "Неверные данные" 
        });
      }

      // Генерация токена
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: "24h" }
      );

      // Установка куки
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true в production (HTTPS)
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 24 часа
        path: '/',
        domain: 'localhost'
      });

      // Ответ клиенту
      res.json({ 
        success: true,
        user: {
          id: user.rows[0].id,
          email: user.rows[0].email
        }
      });

    } catch (err) {
      console.error('Ошибка входа:', err);
      res.status(500).json({ 
        success: false, 
        message: "Ошибка сервера" 
      });
    }
  },

  //---------------------------------------------------- ПРОВЕРКА АВТОРИЗАЦИИ ----------------------------------------------------
  checkAuth: (req, res) => {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ isAuthenticated: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
      res.json({ isAuthenticated: true, user: decoded });
    } catch (e) {
      res.json({ isAuthenticated: false });
    }
  },
//---------------------------------------------------- МЕТОД ВЫХОДА ИЗ АККАУНТА ------------------------------------------------------
  logout: async (req, res) => {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
        domain: 'localhost'
      });
  
      res.json({ success: true, message: "Вы успешно вышли из системы" });
    } catch (err) {
      console.error('Ошибка выхода:', err);
      res.status(500).json({ success: false, message: "Ошибка сервера" });
    }
  }
};