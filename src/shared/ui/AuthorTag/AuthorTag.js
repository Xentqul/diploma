import styles from "./AuthorTag.module.css";

export function AuthorTag({
  href,
  children,
  size = "m", // 's' | 'm' | 'l' | 'xl' | 'xxl'
  color = "black", // 'black' | 'white' | 'gray'
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

  return (
    <a href={href} className={tagClasses} {...props}>
      {children}
    </a>
  );
}
