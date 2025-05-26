const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();

// Роут /api/users/me
router.get("/me", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  try {
    // Расшифровываем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    const userId = decoded.userId;

    // Находим пользователя в базе
    const userResult = await pool.query(
      "SELECT id, first_name, last_name, email, phone_number FROM dressery_schema.users WHERE id = $1",
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ user: userResult.rows[0] });
  } catch (err) {
    console.error("Ошибка при получении пользователя:", err);
    res.status(500).json({ error: "Не удалось получить данные пользователя" });
  }
});

module.exports = router;