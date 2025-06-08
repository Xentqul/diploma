import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Импортируем для навигации
import styles from "./SignUpPage.module.css";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";

function SignUpPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate(); // <-- Хук для навигации

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = null;

    if (name === "agreeTerms") {
      if (!value) {
        error = "Необходимо согласиться с условиями";
      }
    } else {
      if (!value || (typeof value === "string" && !value.trim())) {
        error = "Поле обязательно для заполнения";
      } else if (
        name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        error = "Некорректный email";
      } else if (
        name === "phone" &&
        !/^[0-9]{11}$/.test(value.replace(/\D/g, ""))
      ) {
        error = "Номер должен содержать 11 цифр";
      } else if (name === "password" && value.length < 6) {
        error = "Пароль должен быть не менее 6 символов";
      } else if (name === "confirmPassword" && value !== formData.password) {
        error = "Пароли не совпадают";
      }
    }

    setErrors({ ...errors, [name]: error });
    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (!validateField(key, formData[key])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""),
        password: formData.password,
      });

      // Сохраняем токен и данные пользователя в localStorage (если сервер его возвращает)
      if (response.data.success && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      // Перенаправление на главную страницу
      navigate("/"); // <-- Редирект на главную
      window.location.reload(); // Опционально: обновляем, чтобы сразу обновились данные UI
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message || "Ошибка при регистрации");
      } else {
        alert("Ошибка при регистрации");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        src="assets/signup-pic/signup.webp"
        alt="Зарегистрироваться"
        className={styles.sidePic}
      />

      <div className={styles.rightSide}>
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>
        <div className={styles.formWrapper}>
          <FormBlock
            title="ЗАРЕГИСТРИРОВАТЬСЯ"
            inputs={[
              {
                label: "имя",
                placeholder: "Иван",
                type: "text",
                name: "firstName",
                value: formData.firstName,
                onChange: handleChange,
                onBlur: handleBlur,
              },
              {
                label: "фамилия",
                placeholder: "Иванов",
                type: "text",
                name: "lastName",
                value: formData.lastName,
                onChange: handleChange,
                onBlur: handleBlur,
              },
              {
                label: "эл. почта",
                placeholder: "example@gmail.com",
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                onBlur: handleBlur,
              },
              {
                label: "номер телефона",
                placeholder: "+7-(___)-___-__-__",
                type: "tel",
                name: "phone",
                value: formData.phone,
                onChange: handleChange,
                onBlur: handleBlur,
              },
              {
                label: "пароль",
                placeholder: "Введите ваш пароль",
                type: "password",
                name: "password",
                value: formData.password,
                onChange: handleChange,
                onBlur: handleBlur,
              },
              {
                label: "повторите пароль",
                placeholder: "Повторите ваш пароль",
                type: "password",
                name: "confirmPassword",
                value: formData.confirmPassword,
                onChange: handleChange,
                onBlur: handleBlur,
              },
            ]}
            buttonLabel={isSubmitting ? "Отправка..." : "зарегистрироваться"}
            footerLink={{
              text: "уже есть аккаунт?",
              label: "войти",
              link: "/login",
            }}
            onSubmit={handleSubmit}
            errors={errors}
            checkbox={{
              name: "agreeTerms",
              checked: formData.agreeTerms,
              onChange: handleChange,
              label: "Я согласен(-а) на обработку и хранение персональных данных",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;