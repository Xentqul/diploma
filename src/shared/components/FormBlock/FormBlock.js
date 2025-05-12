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
          />
        ))}
      </div>

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
