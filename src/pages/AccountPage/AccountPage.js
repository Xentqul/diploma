import styles from "./AccountPage.module.css";
import axios from "axios";
import { HorizontalWideArticle } from "@/pages/MainPage/components/CultureBlock/CultureCards/HorizontalWideArticle";
import LabelAndInfo from "@/shared/ui/LabelAndInfo/LabelAndInfo";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Link, useNavigate } from "react-router-dom";
import user from "@/assets/main-pics/first-main-pic.webp";
import { CultureCardsData } from "./CultureCardsData";

function AccountPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Инициирован выход из системы");
  
    try {
      // Отправляем запрос на сервер
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
  
      console.log("Ответ сервера:", response.data);
  
      window.location.href = "/";      
    } catch (error) {
      console.error("Ошибка выхода:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
      alert("Ошибка при выходе. Проверьте консоль.");
    }
  };

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.justify}>
        <div className={styles.topPart}>
          <div className={styles.column}>
            <Link to="/news">Последние новости</Link>
            <HorizontalWideArticle articles={CultureCardsData.slice(1, 3)} />
          </div>

          <div className={styles.userBlock}>
            <img
              src={user}
              alt="Аватар пользователя"
              className={styles.imgBlock}
            />

            <p className={styles.name}>Имя Фамилия</p>

            <LabelAndInfo label="эл. почта" value="example@mail.ru" />
            <LabelAndInfo label="пароль" value="*************" />
            <LabelAndInfo label="номер телефона" value="+7-(926)-666-66-66" />

            <div className={styles.buttonGroup}>
              <LinkButton size="small" onClick={handleLogout}>
                выйти
              </LinkButton>
              <LinkButton size="small">удалить аккаунт</LinkButton>
            </div>
          </div>

          <div className={styles.column}>
            <Link to="/favorites">Избранное</Link>
            <HorizontalWideArticle articles={CultureCardsData.slice(1, 3)} />
          </div>
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
              <input type="checkbox" className={styles.checkbox} />Я даю
              согласие обработку персональных данных
            </label>

            <label className={styles.checkboxLabel}>
              <input type="checkbox" className={styles.checkbox} />Я даю
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
