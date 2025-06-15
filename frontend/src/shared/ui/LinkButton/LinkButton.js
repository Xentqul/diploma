import styles from './LinkButton.module.css';
import { Link } from 'react-router-dom';

export function LinkButton({ 
  children,
  href,
  to,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) {
  const linkClasses = `
    ${styles.link}
    ${styles[variant]}
    ${styles[size]}
    ${className}
  `.trim();

  // Если есть href — внешняя ссылка
  if (href) {
    return (
      <a 
        href={href}
        className={linkClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  // Иначе — внутренняя навигация через react-router
  return (
    <Link 
      to={to}
      className={linkClasses}
      {...props}
    >
      {children}
    </Link>
  );
}