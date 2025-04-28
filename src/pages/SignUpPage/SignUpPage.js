import styles from "./SignUpPage.module.css";
import signupPic from "@/assets/signup-pic/signup.webp";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";

function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      {/* Левая часть: картинка */}
      <img src={signupPic} alt="Зарегистрироваться" className={styles.sidePic} />

      {/* Правая часть: контент */}
      <div className={styles.rightSide}>
        {/* Верхняя часть: кнопка на главную и логотип */}
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>

        {/* Форма регистрации */}
        <FormBlock
          title="ЗАРЕГИСТРИРОВАТЬСЯ"
          inputs={[
            {
              label: "имя",
              placeholder: "Иван",
              type: "text",
              name: "firstName",
            },
            {
              label: "фамилия",
              placeholder: "Иванов",
              type: "text",
              name: "lastName",
            },
            {
              label: "эл. почта",
              placeholder: "example@gmail.com",
              type: "email",
              name: "email",
            },
            {
              label: "номер телефона",
              placeholder: "+7-(___)-___-__-__",
              type: "tel",
              name: "phone",
            },
            {
              label: "пароль",
              placeholder: "Введите ваш пароль",
              type: "password",
              name: "password",
            },
            {
              label: "повторите пароль",
              placeholder: "Повторите ваш пароль",
              type: "password",
              name: "confirmPassword",
            },
          ]}
          buttonLabel="зарегистрироваться"
          footerLink={{
            text: "уже есть аккаунт?",
            label: "войти",
            link: "/login", // Ссылка на страницу входа
          }}
        />
      </div>
    </div>
  );
}

export default SignUpPage;