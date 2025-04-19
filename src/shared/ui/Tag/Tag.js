import styles from "./Tag.module.css";

export function Tag({
  href,
  children,
  size = "medium",
  underline = "noUnderline",
  noHover = false, // true - отключает hover
  ...props
}) {
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