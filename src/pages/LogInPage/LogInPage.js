import styles from "./LogInPage.module.css";
import loginPic from "@/assets/login-pic/login.webp";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";

function LogInPage() {
  return (
    <div className={styles.wrapper}>
      {/* Левая часть: картинка */}
      <img src={loginPic} alt="Войти" className={styles.sidePic} />

      {/* Правая часть: контент */}
      <div className={styles.rightSide}>
        {/* Верхняя часть: кнопка на главную и логотип */}
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>

        {/* Форма входа */}
        <FormBlock
          title="ВХОД В АККАУНТ"
          inputs={[
            {
              label: "эл. почта",
              placeholder: "example@mail.ru",
              type: "email",
              name: "email",
            },
            {
              label: "пароль",
              placeholder: "Введите ваш пароль",
              type: "password",
              name: "password",
            },
          ]}
          buttonLabel="войти"
          footerLink={{
            text: "eще нет аккаунта?",
            label: "зарегистрироваться",
            link: "/signup",
          }}
        />
      </div>
    </div>
  );
}

export default LogInPage;