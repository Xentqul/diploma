import styles from "./InputAndLabel.module.css"

function InputAndLabel({ label, placeholder, type = "text", value, onChange }) {
    return (
      <div className={styles.inputContainer}>
        {/* Подпись */}
        <label className={styles.label}>{label}</label>
        {/* Поле ввода */}
        <input
          className={styles.input}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
  
  export default InputAndLabel;