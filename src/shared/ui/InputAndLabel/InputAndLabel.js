import styles from "./InputAndLabel.module.css";

function InputAndLabel({ 
  label, 
  placeholder, 
  type = "text", 
  name, 
  value, 
  onChange,
  error,
  onBlur
}) {
  const handleChange = (e) => {
    let value = e.target.value;
    
    // Очистка номера телефона
    if (name === 'phone') {
      value = value.replace(/\D/g, '').substring(0, 11);
    }
    
    // Удаление начальных пробелов для всех полей
    if (type !== 'password') {
      value = value.replace(/^\s+/, '');
    }

    onChange({
      target: {
        name,
        value
      }
    });
  };

  const formatPhone = (value) => {
    if (!value) return '';
    const numbers = value.replace(/\D/g, '');
    let result = '+7';
    
    if (numbers.length > 1) result += ` (${numbers.substring(1, 4)}`;
    if (numbers.length > 4) result += `) ${numbers.substring(4, 7)}`;
    if (numbers.length > 7) result += `-${numbers.substring(7, 9)}`;
    if (numbers.length > 9) result += `-${numbers.substring(9, 11)}`;
    
    return result;
  };

  const displayValue = name === 'phone' ? formatPhone(value) : value;

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.error : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        onBlur={onBlur}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
}

export default InputAndLabel;