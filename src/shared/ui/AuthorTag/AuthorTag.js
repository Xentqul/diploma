import styles from "./AuthorTag.module.css";
import { Link } from "react-router-dom";

export function AuthorTag({
  href,
  children,
  size = "m",
  color = "black",
  underline = true,
  weight = "weightRegular",
  className = "",
  ...props
}) {
  const tagClasses = `
      ${styles.authorTag}
      ${styles[size]}
      ${styles[color]}
      ${styles[weight]}
      ${underline ? styles.underline : ""}
      ${className}
    `.trim();

  // Если href передан — используем его
  if (href) {
    return (
      <a href={href} className={tagClasses} {...props}>
        {children}
      </a>
    );
  }

  // Иначе делаем переход на страницу автора по id из URL
  return (
    <Link to={`/author/${props.id}`} className={tagClasses} {...props}>
      {children}
    </Link>
  );
}