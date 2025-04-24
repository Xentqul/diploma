import styles from "./LogInPage.module.css";
import { Link } from "react-router-dom";
import loginPic from "@/assets/login-pic/login.webp";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";
import BackButton from "@/shared/ui/BackButton/BackButton";

function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <img src={loginPic} alt="Войти" className={styles.loginPic} />

      <div className={styles.rightSide}>
        {/* Верхняя часть: кнопка на главную и логотип */}
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>

        <span className={styles.title}>ВХОД В АККАУНТ</span>

        {/* Поля ввода через компонент InputAndLabel */}
        <InputAndLabel
          label="email"
          placeholder="example@gmail.com"
          type="email"
          name="email"
          value=""
          onChange={() => {}}
        />
        <InputAndLabel
          label="password"
          placeholder="Введите ваш пароль"
          type="password"
          name="password"
          value=""
          onChange={() => {}}
        />

        {/* Кнопка отправки данных */}
        <SubmitButton>войти</SubmitButton>

        {/* Ссылка на регистрацию */}
        <p className={styles.registerLink}>
          еще нет аккаунта?{" "}
          <Link to="/register" className={styles.link}>
            зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
