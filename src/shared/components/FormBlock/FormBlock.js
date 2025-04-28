import styles from "./FormBlock.module.css";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";

function FormBlock({ title, inputs, buttonLabel, footerLink }) {
    return (
      <div className={styles.formBlock}>
        {/* Заголовок */}
        <h2 className={styles.formTitle}>{title}</h2>
  
        {/* Контейнер для инпутов */}
        <div className={styles.inputsContainer}>
          {inputs.map((input, index) => (
            <InputAndLabel
              key={index}
              label={input.label}
              placeholder={input.placeholder}
              type={input.type || "text"}
              name={input.name}
              value={input.value || ""}
              onChange={input.onChange || (() => {})}
            />
          ))}
        </div>
  
        {/* Кнопка отправки */}
        <SubmitButton className={styles.alignButton}>{buttonLabel}</SubmitButton>
  
        {/* Ссылка внизу формы */}
        {footerLink && (
          <p className={styles.formFooter}>
            {footerLink.text}{" "}
            <a href={footerLink.link} className={styles.formLink}>
              {footerLink.label}
            </a>
          </p>
        )}
      </div>
    );
  }
  
  export default FormBlock;