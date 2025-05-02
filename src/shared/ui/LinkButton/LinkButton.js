import styles from './LinkButton.module.css';

export function LinkButton({ 
  children,
  href = '#!',
  variant = 'default',
  size = 'medium', // Добавляем пропс для размера
  className = '',
  ...props
}) {
  let linkClasses = `
    ${styles.link}
    ${styles[variant]}
    ${styles[size]} // Добавляем класс размера
    ${className}
  `;

  return (
    <a 
      href={href}
      className={linkClasses.trim()}
      {...props}
    >
      {children}
    </a>
  );
}