const express = require("express");
const router = express.Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const path = require("path");
const fs = require("fs");

// Middleware для проверки токена
const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    req.userId = decoded.userId; // Сохраняем userId в req
    next();
  } catch (err) {
    console.error("Ошибка аутентификации:", err);
    res.status(401).json({ error: "Неверный токен" });
  }
};

// Настройка хранения файлов через multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads/avatars");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Получаем расширение файла
    const userId = req.userId; // Теперь должен быть определён
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const filename = `avatar-${userId}-${uniqueSuffix}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });

// Роут /api/users/me — получение данных пользователя
router.get("/me", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Не авторизован" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret_key");
    const userId = decoded.userId;

    // Находим пользователя в базе
    const userResult = await pool.query(
      "SELECT id, first_name, last_name, email, phone_number, avatar FROM dressery_schema.users WHERE id = $1",
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

// Роут /api/users/upload-avatar — загрузка аватара
router.post(
  "/upload-avatar",
  authenticateToken, // ✅ Важно: middleware добавлен перед обработкой запроса
  upload.single("avatar"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Файл не загружен" });
      }

      const userId = req.userId;

      // Формируем URL для доступа к аватару
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;

      // Получаем старый аватар, чтобы удалить его
      const userRes = await pool.query(
        "SELECT avatar FROM dressery_schema.users WHERE id = $1",
        [userId]
      );
      const oldAvatar = userRes.rows[0]?.avatar;

      // Удаляем старый аватар с диска, если он существует
      if (oldAvatar) {
        const oldAvatarPath = path.join(__dirname, "..", oldAvatar);
        if (fs.existsSync(oldAvatarPath)) {
          fs.unlinkSync(oldAvatarPath);
        }
      }

      // Обновляем аватар в БД
      await pool.query(
        "UPDATE dressery_schema.users SET avatar = $1 WHERE id = $2",
        [avatarUrl, userId]
      );

      res.json({ avatarUrl });
    } catch (err) {
      console.error("Ошибка при загрузке аватара:", err);
      res.status(500).json({ error: "Не удалось загрузить аватар" });
    }
  }
);


//------------------------------------- МЕТОД ДЛЯ ОБНОВЛЕНИЯ ДАННЫХ ПРОФИЛЯ --------------------------------------------------------
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

module.exports = router;