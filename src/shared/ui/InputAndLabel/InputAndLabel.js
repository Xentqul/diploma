import styles from './InputAndLabel.module.css';

function InputAndLabel({
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  options = [],
}) {
   console.log('Options for', name, ':', options); // <--- Добавь это
  const handleChange = (e) => {
    let newValue = e.target.value;

    // Обработка телефона
    if (name === 'phone') {
      newValue = newValue.replace(/\D/g, '').substring(0, 11);
    }

    // Удаление пробелов в начале
    if (type !== 'password') {
      newValue = newValue.replace(/^\s+/, '');
    }

    onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  const formatPhone = (value) => {
    if (!value) return '+7';
    const numbers = value.replace(/\D/g, '');
    let result = '+7';

    if (numbers.length > 1) result += ` (${numbers.substring(1, 4)}`;
    if (numbers.length > 4) result += `) ${numbers.substring(4, 7)}`;
    if (numbers.length > 7) result += `-${numbers.substring(7, 9)}`;
    if (numbers.length > 9) result += `-${numbers.substring(9, 11)}`;

    return result;
  };

  const displayValue = name === 'phone' ? formatPhone(value) : value;

  if (type === 'select') {
    return (
      <div className={styles.inputContainer}>
        <label className={styles.label}>{label}</label>
        <select
          className={`${styles.select} ${error ? styles.error : ''}`}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        >
          {options.map((option, index) => (
            <option
              key={option.value || index}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className={styles.errorMessage}>{error}</div>}
      </div>
    );
  }

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