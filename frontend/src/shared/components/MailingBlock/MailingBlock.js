import styles from "./MailingBlock.module.css";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";
import { useState } from "react";
import axios from "axios";

function MailingBlock() {
  const [email, setEmail] = useState("");
  const [isAgreePersonalData, setIsAgreePersonalData] = useState(false);
  const [isAgreeMarketing, setIsAgreeMarketing] = useState(false);
  const [serverMessage, setServerMessage] = useState(null); // Для ошибок сервера/email
  const [isSuccess, setIsSuccess] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false); // Только для чекбоксов

  const handleSubscribe = async () => {
    // Сбрасываем предыдущие сообщения
    setServerMessage(null);
    setIsSuccess(false);
    setShowCheckboxError(false);

    // 1. Валидация чекбоксов
    if (!isAgreePersonalData || !isAgreeMarketing) {
      setShowCheckboxError(true); // Показываем ошибку чекбоксов
      return; // Не идём дальше
    }

    // 2. Валидация email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setServerMessage("Введите корректный email");
      return;
    }

    // 3. Отправка на сервер
    try {
      await axios.post(
        "https://diploma-od66.onrender.com/api/subscribe",
        { email },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setServerMessage("Вы успешно подписались!");
      setIsSuccess(true);
      setEmail("");
      setIsAgreePersonalData(false);
      setIsAgreeMarketing(false);

      setTimeout(() => setServerMessage(null), 3000);
    } catch (error) {
      setServerMessage(
        error.response?.data?.error || "Ошибка подписки. Попробуйте позже."
      );
    }
  };

  return (
    <div className={styles.bottomPart}>
      <div className={styles.subscriptionBlock}>
        <h3>Не пропустите тренды сезона</h3>
        <p>
          Подпишитесь на нашу рассылку — только актуальная мода, стильные луки и
          эксклюзивы.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <InputAndLabel
            type="email"
            placeholder="Введите ваш email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Сообщение от сервера (успех/ошибка валидации email/ошибка запроса) */}
          {serverMessage && (
            <div
              className={
                isSuccess ? styles.successMessage : styles.errorMessage
              }
            >
              {serverMessage}
            </div>
          )}

          {/* Чекбоксы */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isAgreePersonalData}
              onChange={(e) => setIsAgreePersonalData(e.target.checked)}
            />
            Я даю согласие обработку персональных данных
          </label>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isAgreeMarketing}
              onChange={(e) => setIsAgreeMarketing(e.target.checked)}
            />
            Я даю согласие на получение сообщений рассылки
          </label>

          {/* Ошибка чекбоксов (только если они не отмечены) */}
          {showCheckboxError && (
            <div className={styles.errorMessage}>
              Необходимо дать оба согласия
            </div>
          )}

          <SubmitButton onClick={handleSubscribe}>Подписаться</SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default MailingBlock;