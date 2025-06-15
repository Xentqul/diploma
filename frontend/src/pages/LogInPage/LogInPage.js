import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LogInPage.module.css";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";
import { useAuth } from "@/context/AuthContext";

function LogInPage() {
  const { checkAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://diploma-od66.onrender.com/api/auth/login", 
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        await checkAuth(); // дожидаемся обновления состояния
        navigate("/"); // редирект без перезагрузки
      }
    } catch (err) {
      console.error("Ошибка входа:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Ошибка входа. Попробуйте позже.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        src="/assets/login-pic/login.webp"
        alt="Войти"
        className={styles.sidePic}
      />

      <div className={styles.rightSide}>
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>

        <FormBlock
          title="ВХОД В АККАУНТ"
          inputs={[
            {
              label: "эл. почта",
              placeholder: "example@mail.ru",
              type: "email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
            },
            {
              label: "пароль",
              placeholder: "Введите ваш пароль",
              type: "password",
              name: "password",
              value: formData.password,
              onChange: handleChange,
            },
          ]}
          buttonLabel="войти"
          footerLink={{
            text: "ещё нет аккаунта?",
            label: "зарегистрироваться",
            link: "/signup",
          }}
          helpLink={{
            text: "проблемы со входом?",
            link: "/contacts",
          }}
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
}

export default LogInPage;