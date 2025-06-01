// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db");

// // Роут /api/application — приём заявок
// router.post("/application", async (req, res) => {
//   const { fullName, email, phone, educationLevel, portfolioLink } = req.body;

//   try {
//     // Проверяем, не существует ли уже такая почта
//     const existingEmail = await pool.query(
//       "SELECT * FROM dressery_schema.applications WHERE email = $1",
//       [email]
//     );

//     if (existingEmail.rows.length > 0) {
//       return res.status(400).json({ error: "Этот email уже подавался ранее" });
//     }

//     // Сохраняем заявку в БД
//     const result = await pool.query(
//       "INSERT INTO dressery_schema.applications (full_name, email, phone, education_level, portfolio_link) VALUES ($1, $2, $3, $4, $5) RETURNING *",
//       [fullName, email, phone, educationLevel, portfolioLink]
//     );

//     res.json({
//       message: "Заявка успешно отправлена!",
//       application: result.rows[0],
//     });
//   } catch (err) {
//     console.error("Ошибка сохранения заявки:", err.message);
//     res.status(500).json({ error: "Не удалось сохранить заявку" });
//   }
// });

// module.exports = router;
