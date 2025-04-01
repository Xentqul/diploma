import styles from './LinkButton.module.css';

export function LinkButton({ 
  children,
  href = '#!',
  variant = 'default',
  className = '',
  ...props
}) {
  let linkClasses = `
    ${styles.link}
    ${styles[variant]}
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