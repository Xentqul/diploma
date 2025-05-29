import { useState, useEffect } from "react";
import styles from "./AccountPage.module.css";
import axios from "axios";
import { HorizontalWideArticle } from "@/pages/MainPage/components/CultureBlock/CultureCards/HorizontalWideArticle";
import LabelAndInfo from "@/shared/ui/LabelAndInfo/LabelAndInfo";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Link, useNavigate } from "react-router-dom";
import articles from "@/data/articles.json";

const getLatestArticles = (count = 2) => {
  return articles.slice(0, count); // Берём первые 2 статьи
};

// Регулярка для email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function AccountPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [phoneInputValue, setPhoneInputValue] = useState("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "", // Только цифры, например: "79261234567"
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        const user = response.data.user;

        setUserData(user);
        setFormData({
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          phone_number: user.phone_number || "",
        });
        setPhoneInputValue(user.phone_number || "");
      } catch (error) {
        console.error(
          "Ошибка получения данных пользователя:",
          error.response?.data || error.message
        );
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

  const formatPhoneNumberDisplay = (phone) => {
    if (!phone) return "+7 (---) --- -- --";

    const digits = phone.replace(/\D/g, "");

    let number = digits;
    if (number.startsWith("8")) {
      number = "7" + number.slice(1, 11);
    } else if (!number.startsWith("7") && number.length > 0) {
      number = "7" + number.slice(0, 10);
    } else {
      number = number.slice(0, 11);
    }

    return `+7 (${number.slice(1, 4)}) ${number.slice(4, 7)}-${number.slice(
      7,
      9
    )}-${number.slice(9, 11)}`;
  };

  const handleChangePhoneInput = (e) => {
    let value = e.target.value;

    // Убираем всё, кроме цифр
    let digitsOnly = value.replace(/\D/g, "");

    // Добавляем 7, если её нет
    if (!digitsOnly.startsWith("7")) {
      digitsOnly = "7" + digitsOnly.slice(0, 10);
    } else {
      digitsOnly = digitsOnly.slice(0, 11);
    }

    setPhoneInputValue(digitsOnly);

    // Форматируем и обновляем инпут
    let formatted = "";
    for (let i = 0; i < digitsOnly.length; i++) {
      const digit = digitsOnly[i];
      switch (i) {
        case 1:
          formatted += "(" + digit;
          break;
        case 4:
          formatted += ") " + digit;
          break;
        case 7:
          formatted += "-" + digit;
          break;
        case 9:
          formatted += "-" + digit;
          break;
        default:
          formatted += digit;
          break;
      }
    }

    const phoneField = document.querySelector("[name='phone_number']");
    if (phoneField) {
      phoneField.value = formatted;
    }
  };

  const handleChangeOther = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Сохраняем изменения
      const saveChanges = async () => {
        const phoneDigits = phoneInputValue.replace(/\D/g, "");

        if (!/^7\d{10}$/.test(phoneDigits)) {
          alert("Введите корректный телефон в формате +7...");
          return;
        }

        if (!isValidEmail(formData.email)) {
          alert("Введите корректный email с @ и доменом");
          return;
        }

        try {
          const response = await axios.post(
            "http://localhost:5000/api/users/update-profile",
            {
              first_name: formData.first_name,
              last_name: formData.last_name,
              email: formData.email,
              phone_number: phoneDigits,
            },
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // Сохраняем аватар, если он есть
          const updatedUser = {
            ...response.data.user,
            avatar: userData.avatar,
          };

          setUserData(updatedUser);
          setIsEditing(false);
          alert("Данные успешно обновлены");
        } catch (error) {
          console.error("Ошибка сохранения профиля:", error);
          alert("Не удалось сохранить изменения");
        }
      };

      saveChanges();
    } else {
      setIsEditing(true);
    }
  };

  // 💡 Загрузка аватара
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/upload-avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUserData((prev) => ({
        ...prev,
        avatar: response.data.avatarUrl,
      }));

      alert("Аватар успешно загружен!");
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
      alert("Не удалось загрузить аватар");
    }
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
            {/* 👇 Кнопка загрузки аватара */}
            <label className={styles.avatarUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />

              {/* Отображение аватара */}
              {userData?.avatar ? (
                <img
                  src={`http://localhost:5000${userData.avatar}`}
                  alt={`${userData?.first_name} ${userData?.last_name}`}
                  className={styles.imgBlock}
                  onError={(e) => {
                    e.target.src = ""; // Не падаем, если ошибка
                  }}
                />
              ) : (
                <div className={styles.fallbackAvatar}>?</div>
              )}
            </label>

            {/* Имя и фамилия */}
            <div className={styles.editableRow}>
              <p className={styles.name}>
                {isEditing ? (
                  <>
                    <InputAndLabel
                      label="Имя"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChangeOther}
                    />
                    <InputAndLabel
                      label="Фамилия"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChangeOther}
                    />
                  </>
                ) : (
                  `${userData?.first_name || "?"} ${userData?.last_name || "?"}`
                )}
              </p>
              {!isEditing && (
                <span onClick={toggleEdit} className={styles.editIcon}>
                  ✏️
                </span>
              )}
            </div>

            {/* Эл. почта */}
<div className={styles.editableRow}>
  <LabelAndInfo
    label="эл. почта"
    value={
      isEditing ? (
        <InputAndLabel
          name="email"
          value={formData.email}
          onChange={handleChangeOther}
        />
      ) : (
        <span className={styles.dbValue}>{userData?.email || "example@mail.ru"}</span>
      )
    }
  />
  {!isEditing && (
    <span onClick={toggleEdit} className={styles.editIcon}>
      ✏️
    </span>
  )}
</div>

{/* Номер телефона */}
<div className={styles.editableRow}>
  <LabelAndInfo
    label="номер телефона"
    value={
      isEditing ? (
        <input
          type="text"
          name="phone_number"
          placeholder="+7 (926) 123-45-67"
          className={styles.inputField}
          maxLength={18}
          onInput={handleChangePhoneInput}
        />
      ) : (
        <span className={styles.dbValue}>
          {formatPhoneNumberDisplay(userData?.phone_number)}
        </span>
      )
    }
  />
  {!isEditing && (
    <span onClick={toggleEdit} className={styles.editIcon}>
      ✏️
    </span>
  )}
</div>
            {/* Кнопка сохранить */}
            {isEditing && (
              <div className={styles.buttonGroup}>
                <LinkButton
                  type="button"
                  className={styles.saveButton}
                  onClick={toggleEdit}
                >
                  сохранить
                </LinkButton>
              </div>
            )}

            {/* Кнопки аккаунта */}
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
    </div>
  );
}

export default AccountPage;
