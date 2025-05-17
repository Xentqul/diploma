import styles from "./FormBlock.module.css";
import InputAndLabel from "@/shared/ui/InputAndLabel/InputAndLabel";
import SubmitButton from "@/shared/ui/SubmitButton/SubmitButton";

function FormBlock({
  title,
  inputs,
  buttonLabel,
  footerLink,
  onSubmit,
  errors,
  checkbox,
}) {
  return (
    <form onSubmit={onSubmit} className={styles.formBlock}>
      <h2 className={styles.formTitle}>{title}</h2>

      <div className={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <InputAndLabel
            key={index}
            label={input.label}
            placeholder={input.placeholder}
            type={input.type || "text"}
            name={input.name}
            value={input.value}
            onChange={input.onChange}
            onBlur={input.onBlur}
            error={errors && errors[input.name]}
            options={input.options}
          />
        ))}
      </div>

      {/* Блок с чекбоксом */}
      {checkbox && (
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={checkbox.name}
            name={checkbox.name}
            checked={checkbox.checked}
            onChange={checkbox.onChange}
            className={styles.checkbox}
          />
          <label htmlFor={checkbox.name} className={styles.checkboxLabel}>
            {checkbox.label}
          </label>
        </div>
      )}

      <SubmitButton className={styles.alignButton} type="submit">
        {buttonLabel}
      </SubmitButton>

      {footerLink && (
        <p className={styles.formFooter}>
          {footerLink.text}{" "}
          <a href={footerLink.link} className={styles.formLink}>
            {footerLink.label}
          </a>
        </p>
      )}
    </form>
  );
}

export default FormBlock;
