import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./LogInPage.module.css";
import loginPic from "@/assets/login-pic/login.webp";
import BackButton from "@/shared/ui/BackButton/BackButton";
import FormBlock from "@/shared/components/FormBlock/FormBlock";

function LogInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData
      );

      if (response.data.success) {
        // Сохраняем данные пользователя
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Перенаправляем на главную
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка входа');
    }
  };

  return (
    <div className={styles.wrapper}>
      <img src={loginPic} alt="Войти" className={styles.sidePic} />

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
            text: "eще нет аккаунта?",
            label: "зарегистрироваться",
            link: "/signup",
          }}
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </div>
  );
}

export default LogInPage;