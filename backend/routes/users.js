const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const supabase = require('../config/supabase');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }); // Работа с файлами в памяти

// Middleware для проверки токена
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Ошибка аутентификации:", err);
    res.status(401).json({ error: "Неверный токен" });
  }
};

// Роут /api/users/me — получение данных пользователя
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const userId = req.userId;

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

// Роут /api/users/me — удаление аккаунта
router.delete("/me", authenticateToken, async (req, res) => {
  const userId = req.userId;

  try {
    const result = await pool.query(
      "DELETE FROM dressery_schema.users WHERE id = $1 RETURNING *",
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.clearCookie("token");
    res.json({ message: "Аккаунт успешно удалён" });
  } catch (err) {
    console.error("Ошибка при удалении аккаунта:", err);
    res.status(500).json({ error: "Не удалось удалить аккаунт" });
  }
});

// Обновление данных профиля
router.post("/update-profile", authenticateToken, async (req, res) => {
  const { first_name, last_name, phone_number, email } = req.body;
  const userId = req.userId;

  try {
    const result = await pool.query(
      `UPDATE dressery_schema.users 
       SET first_name = $1, last_name = $2, phone_number = $3, email = $4 
       WHERE id = $5
       RETURNING id, first_name, last_name, email, phone_number`,
      [first_name, last_name, phone_number, email, userId]
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Ошибка при обновлении профиля:", err);
    res.status(500).json({ error: "Не удалось обновить данные" });
  }
});

// Роут /api/users/upload-avatar — загрузка аватара
router.post("/upload-avatar", authenticateToken, upload.single("avatar"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "Файл не загружен" });
  }

  try {
    const userId = req.userId;
    const fileExt = file.originalname.split(".").pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Загружаем файл в Supabase Storage
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file.buffer);

    if (error) {
      console.error("Ошибка загрузки файла в Supabase:", error);
      return res.status(500).json({ error: "Не удалось загрузить аватар" });
    }

    // Получаем публичный URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    // Обновляем поле avatar в базе данных
    const result = await pool.query(
      "UPDATE dressery_schema.users SET avatar = $1 WHERE id = $2 RETURNING avatar",
      [data.publicUrl, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ avatarUrl: data.publicUrl });
  } catch (err) {
    console.error("Ошибка при обработке загрузки аватара:", err);
    res.status(500).json({ error: "Не удалось загрузить аватар" });
  }
});

module.exports = router;
