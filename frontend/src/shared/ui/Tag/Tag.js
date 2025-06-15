import { Link } from "react-router-dom";
import styles from "./Tag.module.css";

export function Tag({
  href,
  id, // добавляем новый пропс — id тега (например, 'grammy')
  children,
  size = "medium",
  underline = "noUnderline",
  noHover = false,
  ...props
}) {
  // Если передан href — используем его
  if (href) {
    return (
      <a
        href={href}
        className={`
          ${styles.tag} 
          ${styles[size]} 
          ${styles[underline]}
          ${noHover ? styles.noHover : ''}
        `}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Иначе делаем переход на /tag/:id
  return (
    <Link
      to={`/tag/${id}`}
      className={`
        ${styles.tag} 
        ${styles[size]} 
        ${styles[underline]}
        ${noHover ? styles.noHover : ''}
      `}
      {...props}
    >
      {children}
    </Link>
  );
}