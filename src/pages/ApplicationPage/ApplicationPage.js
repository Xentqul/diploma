import React, { useState } from 'react';
import axios from 'axios';
import styles from "./ApplicationPage.module.css";
import applicationPic from "@/assets/application-pic/applicationForm.webp";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";

function ApplicationPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationLevel: '',
    portfolioLink: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Очистка телефона (оставляем только цифры)
    if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '').substring(0, 11);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));

    // Очищаем ошибку при изменении
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

const validateField = (name, value) => {
  let error = '';

  if (!value || (typeof value === 'string' && !value.trim())) {
    error = "Поле обязательно для заполнения";
    setErrors(prev => ({ ...prev, [name]: error }));
    return false;
  }

  switch (name) {
    case 'fullName':
      if (!/^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+(\s[А-ЯЁ][а-яё]+)?$/u.test(value)) {
        error = "Введите полное ФИО (Иванов Иван Иванович)";
      }
      break;
    case 'phone':
      if (value.replace(/\D/g, '').length < 11) {
        error = "Номер должен содержать 11 цифр";
      }
      break;
  }

  setErrors(prev => ({ ...prev, [name]: error }));
  return !error;
};

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/application', {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        educationLevel: formData.educationLevel,
        portfolioLink: formData.portfolioLink.trim(),
      });

      alert("Заявка успешно отправлена!");
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при отправке:", error);
      alert("Произошла ошибка при отправке заявки");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src={applicationPic} alt="Подать заявку" className={styles.sidePic} />

      <div className={styles.rightSide}>
        <div className={styles.topSection}>
          <BackButton>на главную</BackButton>
          <span className={styles.logo}>DRESSERY</span>
        </div>

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
              error: errors.fullName,
            },
            {
              label: "Эл. почта",
              placeholder: "example@gmail.com",
              type: "email",
              name: "email",
              value: formData.email,
              onChange: handleChange,
              error: errors.email,
            },
            {
              label: "Номер телефона",
              placeholder: "+7 (999) 123-45-67",
              type: "tel",
              name: "phone",
              value: formData.phone,
              onChange: handleChange,
              error: errors.phone,
            },
            {
              label: "Уровень образования",
              type: "select",
              name: "educationLevel",
              value: formData.educationLevel,
              onChange: handleChange,
              error: errors.educationLevel,
              options: [
                { value: "", label: "Выберите уровень образования", disabled: true },
                { value: "college", label: "Среднее специальное" },
                { value: "bachelor", label: "Бакалавриат" },
                { value: "master", label: "Магистратура" },
                { value: "graduate", label: "Аспирантура" },
              ],
            },
            {
              label: "Ссылка на портфолио",
              placeholder: "https://example.com/portfolio",
              type: "url",
              name: "portfolioLink",
              value: formData.portfolioLink,
              onChange: handleChange,
              error: errors.portfolioLink,
            },
          ]}
          buttonLabel={isSubmitting ? "Отправка..." : "Отправить"}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default ApplicationPage;