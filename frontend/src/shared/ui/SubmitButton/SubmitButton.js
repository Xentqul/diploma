import styles from "./SubmitButton.module.css";

function SubmitButton({
  children,
  variant = "default",
  className = "",
  disabled = false,
  onClick,
  ...props
}) {
  let buttonClasses = `
      ${styles.button}
      ${styles[variant]}
      ${className}
    `.trim();

  return (
    <button
      type="submit"
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default SubmitButton; // Экспорт по умолчанию