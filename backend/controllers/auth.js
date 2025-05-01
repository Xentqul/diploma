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
        "INSERT INTO dressery_schema.users (...) VALUES (...) RETURNING *",
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

  //------------------------------------------------------------------ МЕТОД ВХОДА -------------------------------------------------------------------
  login: async (req, res) => {
    const { email, password } = req.body;
  
    try {
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
  
      const isValidPass = await bcrypt.compare(password, user.rows[0].password_hash);
      if (!isValidPass) {
        return res.status(401).json({ 
          success: false, 
          message: "Неверные данные" 
        });
      }
  
      const token = jwt.sign(
        { userId: user.rows[0].id },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: "24h" }
      );
  
      // Явно устанавливаем заголовки перед отправкой куки
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true в production (HTTPS)
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
        domain: 'localhost'
      });
  
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
};
