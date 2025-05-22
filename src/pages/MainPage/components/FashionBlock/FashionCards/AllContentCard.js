import styles from "./AllContentCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function AllContentCard({ data = [] }) {
  const currentLang = "ru";

  return (
    <div className={styles.asideArticle}>
      {data.map((article) => {
        const title = article.title?.[currentLang] || "Без заголовка";
        const description = article.description?.[currentLang];
        const authorName = article.author?.name?.[currentLang] || article.author?.name || "Неизвестный автор";
        const firstTag = article.tags?.[0]?.visible?.[currentLang] || "";
        const imageSrc = article.images?.[0]; // Берём первую картинку

        return (
          <article key={article.id} className={styles.wrapperAsideArticle}>
            {/* Картинка */}
            <Link to={article.link}>
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt={title}
                  className={styles.asideImage}
                  onError={(e) => {
                    e.target.style.display = "none"; // или можно показать fallback
                  }}
                />
              )}
            </Link>

            {/* Контент */}
            <div className={styles.asideContent}>
              {/* Тег */}
              {firstTag && <Tag size="small" id={article.tags[0].id}>{firstTag}</Tag>}

              {/* Заголовок */}
              <Link to={article.link} className={styles.linkUnderline}>
                <h3 className={styles.asideTitle}>{title}</h3>
              </Link>

              {/* Описание */}
              {description && (
                <p className={styles.asideDescription}>{description}</p>
              )}

              {/* Автор */}
              {article.author && (
                <AuthorTag size="s" color="gray" id={article.author.id}>
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