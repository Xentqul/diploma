import React, { useState } from "react";
import axios from "axios";
import styles from "./ApplicationPage.module.css";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";
import { useNavigate } from "react-router-dom";

function ApplicationPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    educationLevel: "",
    portfolioLink: "",
  });

  const [errors, setErrors] = useState({});
  const [personalDataAgreed, setPersonalDataAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "phone") {
      formattedValue = value.replace(/\D/g, "").substring(0, 11);
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = null;

    if (!value || (typeof value === "string" && !value.trim())) {
      error = "Поле обязательно для заполнения";
    } else {
      switch (name) {
        case "fullName":
          if (
            !/^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+(\s[А-ЯЁ][а-яё]+)?$/u.test(value)
          ) {
            error = "Введите корректное ФИО (например: Иванов Иван Иванович)";
          }
          break;
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Введите корректный email";
          }
          break;
        case "phone":
          if (value.replace(/\D/g, "").length < 11) {
            error = "Номер должен содержать 11 цифр";
          }
          break;
        case "educationLevel":
          if (!value) error = "Выберите уровень образования";
          break;
        case "portfolioLink":
          if (
            value &&
            !/^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}\/?.*$/i.test(value)
          ) {
            error = "Введите корректную ссылку";
          }
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((name) => {
      if (!validateField(name, formData[name])) {
        isValid = false;
      }
    });

    if (!personalDataAgreed) {
      newErrors.agreePersonalData =
        "Необходимо дать согласие на обработку данных";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post(
        "	https://diploma-od66.onrender.com/api/application",
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          educationLevel: formData.educationLevel,
          portfolioLink: formData.portfolioLink,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/");
    } catch (error) {
      const errorMsg = error.response?.data?.error;

      if (errorMsg === "Этот email уже подавался ранее") {
        setErrors((prev) => ({ ...prev, email: errorMsg }));
      } else {
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img
        src="/assets/application-pic/applicationForm.webp"
        alt="Подать заявку"
        className={styles.sidePic}
      />

      <div className={styles.rightSide}>
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>
        <div className={styles.formWrapper}>
          <FormBlock
            title="ПОДАТЬ ЗАЯВКУ"
            inputs={[
              {
                label: "ФИО",
                placeholder: "Иванов Иван Иванович",
                type: "text",
                name: "fullName",
                value: formData.fullName,
                onChange: handleChange,
                onBlur: handleBlur,
                error: errors.fullName,
                required: true,
              },
              {
                label: "Эл. почта",
                placeholder: "example@gmail.com",
                type: "email",
                name: "email",
                value: formData.email,
                onChange: handleChange,
                onBlur: handleBlur,
                error: errors.email,
                required: true,
              },
              {
                label: "Номер телефона",
                placeholder: "+7 (999) 123-45-67",
                type: "tel",
                name: "phone",
                value: formData.phone,
                onChange: handleChange,
                onBlur: handleBlur,
                error: errors.phone,
                required: true,
              },
              {
                label: "Уровень образования",
                type: "select",
                name: "educationLevel",
                value: formData.educationLevel,
                onChange: handleChange,
                onBlur: handleBlur,
                error: errors.educationLevel,
                options: [
                  {
                    value: "",
                    label: "Выберите уровень образования",
                    disabled: true,
                  },
                  { value: "college", label: "Среднее специальное" },
                  { value: "bachelor", label: "Бакалавриат" },
                  { value: "master", label: "Магистратура" },
                  { value: "graduate", label: "Аспирантура" },
                ],
                required: true,
              },
              {
                label: "Ссылка на портфолио",
                placeholder: "https://example.com/portfolio",
                type: "url",
                name: "portfolioLink",
                value: formData.portfolioLink,
                onChange: handleChange,
                onBlur: handleBlur,
                error: errors.portfolioLink,
              },
            ]}
            buttonLabel={isSubmitting ? "Отправка..." : "Отправить"}
            onSubmit={handleSubmit}
            errors={errors}
            checkbox={{
              name: "agreePersonalData",
              checked: personalDataAgreed,
              onChange: (e) => {
                setPersonalDataAgreed(e.target.checked);
                if (errors.agreePersonalData) {
                  setErrors((prev) => ({ ...prev, agreePersonalData: null }));
                }
              },
              label: "Я согласен(-а) на обработку персональных данных",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ApplicationPage;
