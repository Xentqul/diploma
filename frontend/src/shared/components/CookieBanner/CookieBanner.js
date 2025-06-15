import React, { useEffect, useState } from "react";
import styles from "./CookieBanner.module.css";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const hasAccepted = sessionStorage.getItem("cookieConsent");

    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true); // запускаем анимацию закрытия

    // после завершения анимации (например, через 300 мс) скрываем баннер
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("cookieConsent", "true");
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`${styles.cookieBanner} ${isClosing ? styles.closing : ""}`}
    >
      <div className={styles.wrapper}>
        <p className={styles.text}>
          Мы используем файлы cookie, чтобы сделать сайт удобнее. Нажимая «Я
          согласен(-а)», вы принимаете нашу политику конфиденциальности.
        </p>
        <button onClick={handleClose} className={styles.acceptButton}>
          Я согласен(-а)
        </button>
      </div>
    </div>
  );
};
