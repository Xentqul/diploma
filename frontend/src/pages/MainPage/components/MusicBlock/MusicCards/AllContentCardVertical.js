import styles from "./AllContentCardVertical.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function AllContentCardVertical({ data = [] }) {
  const currentLang = "ru";

  return (
    <div className={styles.wrapper}>
      {data.map((article) => {
        const title = article.title?.[currentLang] || "Без заголовка";
        const description = article.description?.[currentLang];
        const authorName = article.author?.name?.[currentLang] || "Неизвестный автор";
        const imageSrc = article.images?.[0];

        return (
          <Link
            key={article.id}
            to={article.link}
            className={styles.cardLink}
          >
            <article className={styles.card}>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={title}
                  className={styles.cardImage}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              )}
              <div className={styles.cardContent}>
                {article.tags && article.tags.length > 0 && (
                  <Tag id={article.tags[0].id} size="medium">
                    {article.tags[0].visible?.[currentLang] || article.tags[0].id}
                  </Tag>
                )}

                <h3 className={styles.cardTitle}>{title}</h3>

                {description && (
                  <p className={styles.cardDescription}>{description}</p>
                )}

                {article.author && (
                  <AuthorTag id={article.author.id} size="m" color="gray">
                    {authorName}
                  </AuthorTag>
                )}
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}