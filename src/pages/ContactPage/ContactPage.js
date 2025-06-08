import styles from './ContactPage.module.css';

const ContactPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Наши контакты</h1>
        <p className={styles.subtitle}>Мы всегда рады вашим вопросам и предложениям</p>
      </div>

      <div className={styles.contactCards}>
        {/* Карточка: Электронная почта */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <img src="/assets/icons/contacts-feedback.png" alt="Электронная почта" className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Электронная почта</h3>
          <p className={styles.cardText}>
            Для общих вопросов, сотрудничества и обратной связи
          </p>
          <a href="mailto:DRESSERYhello@mail.ru" className={styles.contactLink}>
            DRESSERYhello@mail.ru
          </a>
        </div>

        {/* Карточка: Поддержка (иконка инвертируется автоматически через CSS) */}
        <div className={styles.cardBlack}>
          <div className={styles.cardIcon}>
            <img src="/assets/icons/contacts-support.png" alt="Поддержка" className={styles.iconInversion} />
          </div>
          <h3 className={styles.cardTitle}>Поддержка</h3>
          <p className={styles.cardText}>
            Для восстановления доступа к аккаунту и технических вопросов
          </p>
          <a href="mailto:DRESSERYsupport@mail.ru" className={styles.contactLink}>
            DRESSERYsupport@mail.ru
          </a>
        </div>

        {/* Карточка: Предложения */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <img src="/assets/icons/contacts-offers.png" alt="Предложения" className={styles.icon} />
          </div>
          <h3 className={styles.cardTitle}>Предложения</h3>
          <p className={styles.cardText}>
            Хотите предложить сотрудничество или новую функцию?
          </p>
          <a href="mailto:DRESSERYideas@mail.ru" className={styles.contactLink}>
            DRESSERYideas@mail.ru
          </a>
        </div>
      </div>

      <div className={styles.instructions}>
        <h2 className={styles.instructionsTitle}>Как написать нам</h2>
        <ol className={styles.instructionsList}>
          <li>1. Выберите подходящий адрес из списка выше</li>
          <li>2. Укажите в теме письма суть вашего обращения</li>
          <li>3. Опишите вопрос максимально подробно</li>
          <li>4. Для восстановления пароля укажите ваш username или email регистрации</li>
        </ol>
        <p className={styles.note}>
          Мы отвечаем в течение 1-2 рабочих дней
        </p>
      </div>
    </div>
  );
};

export default ContactPage;