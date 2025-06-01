const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Роут подписки на рассылку
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: "Введите корректный email" });
  }

  try {
    // Проверяем, есть ли такой email уже в базе
    const existingUser = await pool.query(
      "SELECT * FROM dressery_schema.subscribers WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "Вы уже подписаны на рассылку" });
    }

    // Сохраняем в БД
    const result = await pool.query(
      "INSERT INTO dressery_schema.subscribers (email) VALUES ($1) RETURNING *",
      [email]
    );

    res.json({
      message: "Вы успешно подписались!",
      subscriber: result.rows[0],
    });
  } catch (err) {
    console.error("Ошибка подписки:", err);
    res.status(500).json({ error: "Не удалось подписаться" });
  }
});

module.exports = router;
