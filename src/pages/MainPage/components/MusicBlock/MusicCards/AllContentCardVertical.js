import styles from "./AllContentCardVertical.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function AllContentCardVertical({ data = [], tagId, authorId }) {
  const currentLang = "ru";

  return (
    <div className={`${styles.asideArticle} ${styles.flexAlign}`}>
      {data.map((article) => {
        const title = article.title?.[currentLang] || "Без заголовка";
        const description = article.description?.[currentLang];
        const authorName = article.author?.name?.[currentLang] || article.author?.name || "Неизвестный автор";
        const imageSrc = article.images?.[0]; // ✅ Берём первую картинку

        return (
          <article
            key={article.id}
            className={`${styles.wrapperAsideArticle} ${styles.verticalVariant}`}
          >
            <Link to={article.link}>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={title}
                  className={`${styles.asideImage} ${styles.verticalImage}`}
                  onError={(e) => {
                    e.target.style.display = "none"; // можно показать fallback
                  }}
                />
              )}
            </Link>

            <div className={`${styles.asideContent} ${styles.verticalContent}`}>
              {article.tags && article.tags.length > 0 && (
                <Tag id={article.tags[0].id} size="small">
                  {article.tags[0].visible?.[currentLang] || article.tags[0].id}
                </Tag>
              )}

              <Link to={article.link} className={styles.linkUnderline}>
                <h3 className={styles.asideTitle}>{title}</h3>
              </Link>

              {description && (
                <p className={styles.asideDescription}>{description}</p>
              )}

              {article.author && (
                <AuthorTag id={article.author.id} size="s" color="gray">
                  {authorName}
                </AuthorTag>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}