import styles from "./Tag.module.css";

export function Tag({
  href,
  children,
  variant = "default",
  size = "medium",
  underline,
  hoverColor = "--hover-tag",
  color,
  ...props
}) {
  const tagClasses = `
    ${styles.tag}
    ${styles[variant]}
    ${styles[size]}
    ${styles[color]}
    ${underline ? styles.underlined : styles.noUnderline}
  `;

  return (
    <a
      href={href}
      className={tagClasses.trim()}
      {...props}
    >
      {children}
    </a>
  );
}
