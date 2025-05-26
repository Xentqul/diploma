import { useState, useEffect } from "react";
import styles from "./AccountPage.module.css";
import axios from "axios";
import { HorizontalWideArticle } from "@/pages/MainPage/components/CultureBlock/CultureCards/HorizontalWideArticle";
import LabelAndInfo from "@/shared/ui/LabelAndInfo/LabelAndInfo";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Link, useNavigate } from "react-router-dom";
import articles from "@/data/articles.json"; // Предполагается, что это JSON с последними статьями

const getLatestArticles = (count = 2) => {
  return articles.slice(0, count); // Берём первые 3 статьи
};

function AccountPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        withCredentials: true
      });

      console.log("Данные пользователя:", response.data); // 💡 Смотри сюда
      setUserData(response.data.user); // 👈 Обрати внимание на .user
    } catch (error) {
      console.error("Ошибка получения данных пользователя:", error.response?.data || error.message);
      alert("Не удалось загрузить данные пользователя");
    }
  };

  fetchUserData();
}, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Ошибка выхода:", error);
      alert("Ошибка при выходе. Проверьте консоль.");
    }
  };

  const renderArticlesSection = (title, link, articlesData) => (
    <div className={styles.column}>
      <Link to={link}>{title}</Link>
      {articlesData.length > 0 ? (
        <HorizontalWideArticle articles={articlesData} />
      ) : (
        <div className={styles.placeholder}>Нет статей для отображения</div>
      )}
    </div>
  );

  const formatPhoneNumber = (phone) => {
  if (!phone) return "+7 (---) --- -- --";

  // Убираем все нецифровые символы
  const digits = phone.replace(/\D/g, '');

  // Проверяем, начинается ли с 7 или 8, и обрезаем
  const number = digits.startsWith('7') || digits.startsWith('8')
    ? digits.slice(1)
    : digits;

  // Дополняем нулями, если меньше 10 цифр
  const paddedNumber = number.padEnd(10, '0');

  // Форматируем
  return `+7 (${paddedNumber.slice(0, 3)}) ${paddedNumber.slice(3, 6)}-${paddedNumber.slice(6, 8)}-${paddedNumber.slice(8, 10)}`;
};

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.justify}>
        <div className={styles.topPart}>
          {renderArticlesSection(
            "Последние новости",
            "/news",
            getLatestArticles()
          )}

          <div className={styles.userBlock}>
            {userData?.avatar ? (
              <img
                src={userData.avatar}
                alt={`${userData.first_name} ${userData.last_name}`}
                className={styles.imgBlock}
                onError={(e) => {
                  e.target.src = "/assets/users/default-avatar.png";
                }}
              />
            ) : (
              <div className={styles.fallbackAvatar}>?</div>
            )}

            <p className={styles.name}>
              {userData?.first_name} {userData?.last_name}
            </p>

            <LabelAndInfo
              label="эл. почта"
              value={userData?.email || "example@mail.ru"}
            />
            <LabelAndInfo label="пароль" value="*************" />
<LabelAndInfo
  label="номер телефона"
  value={formatPhoneNumber(userData?.phone_number)}
/>

            <div className={styles.buttonGroup}>
              <LinkButton size="small" onClick={handleLogout}>
                выйти
              </LinkButton>
              <LinkButton size="small">удалить аккаунт</LinkButton>
            </div>
          </div>

          {renderArticlesSection("Избранное", "/favorites", [])}
        </div>
      </div>

      <div className={styles.bottomPart}>
        <div className={styles.subscriptionBlock}>
          <h3>Не пропустите тренды сезона</h3>
          <p>
            Подпишитесь на нашу рассылку — только актуальная мода, стильные луки
            и эксклюзивы.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className={styles.subscriptionForm}
          >
            <InputAndLabel type="email" placeholder="Введите ваш email" />

            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} /> Я даю
              согласие обработку персональных данных
            </label>

            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} /> Я даю
              согласие на получение рекламных сообщений
            </label>

            <SubmitButton className={styles.contrastColorButton}>
              подписаться
            </SubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;