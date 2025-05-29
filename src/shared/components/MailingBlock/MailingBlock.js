import styles from "./MailingBlock.module.css";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";

function MailingBlock() {
  return (
    <div className={styles.bottomPart}>
      <div className={styles.subscriptionBlock}>
        <h3>Не пропустите тренды сезона</h3>
        <p>
          Подпишитесь на нашу рассылку — только актуальная мода, стильные луки и
          эксклюзивы.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className={styles.subscriptionForm}
        >
          <InputAndLabel type="email" placeholder="Введите ваш email" />

          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} /> Я даю согласие
            обработку персональных данных
          </label>

          <label className={styles.checkboxLabel}>
            <input type="checkbox" className={styles.checkbox} /> Я даю согласие
            на получение рекламных сообщений
          </label>

          <SubmitButton className={styles.contrastColorButton}>
            подписаться
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}

export default MailingBlock;
