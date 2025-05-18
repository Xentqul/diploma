import styles from "./AllContentCardVertical.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function AllContentCardVertical({ data = [] }) {
  const currentLang = "ru";

  return (
    <div className={`${styles.asideArticle} ${styles.flexAlign}`}>
      {data.map((article) => (
        <article
          key={article.id}
          className={`${styles.wrapperAsideArticle} ${styles.verticalVariant}`}
        >
          <Link to={article.link}>
            <img
              src={article.image}
              alt={article.title?.[currentLang] || "Без заголовка"}
              className={`${styles.asideImage} ${styles.verticalImage}`}
            />
          </Link>

          <div className={`${styles.asideContent} ${styles.verticalContent}`}>
            {article.tags && article.tags.length > 0 && (
              <Tag size="small" href={`/tags/${article.tags[0].id}`}>
                {article.tags[0].visible?.[currentLang] || article.tags[0].id}
              </Tag>
            )}

            <Link to={article.link} className={styles.linkUnderline}>
              <h3 className={styles.asideTitle}>
                {article.title?.[currentLang] || "Без заголовка"}
              </h3>
            </Link>

            {article.description?.[currentLang] && (
              <p className={styles.asideDescription}>
                {article.description[currentLang]}
              </p>
            )}

            {article.author && (
              <AuthorTag
                size="s"
                color="gray"
                href={`/authors/${article.author.id}`}
              >
                {article.author.name?.[currentLang] ||
                  article.author.name ||
                  "Неизвестный автор"}
              </AuthorTag>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}