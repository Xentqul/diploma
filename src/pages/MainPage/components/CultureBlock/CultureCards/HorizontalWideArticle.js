import styles from "./HorizontalWideArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function HorizontalWideArticle({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className={styles.asideContainer}>
      {articles.map((article) => {
        const title = article.title?.ru || "";
        const authorName = article.author?.name?.ru || "Неизвестный автор";
        const firstTag = article.tags?.[0]?.visible?.ru || "";

        // Берём первую картинку из данных статьи
        const imageSrc = article.images?.[0];

        return (
          <article key={article.id} className={styles.asideItem}>
            <Link to={article.link} className={styles.imageLink}>
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

            <div className={styles.content}>
              {firstTag && (
                <Tag size="medium" id={article.tags[0].id}>
                  {firstTag}
                </Tag>
              )}

              <Link className={styles.linkForTitle} to={article.link}>
                <h3 className={styles.title}>{title}</h3>
              </Link>

              <AuthorTag
                className={styles.author}
                color="gray"
                size="s"
                id={article.author?.id}
              >
                {authorName}
              </AuthorTag>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default HorizontalWideArticle;