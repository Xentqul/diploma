import styles from "./SimpleHorizontalCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function SimpleHorizontalCard({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {articles.map((article) => {
          const title = article.title?.ru || "";
          const authorName = article.author?.name?.ru || "Неизвестный автор";
          const firstTag = article.tags?.[0]?.visible?.ru || "";
          const imageSrc = article.images?.[0]; // Берём первую картинку из данных статьи

          return (
            <article key={article.id} className={styles.beautyItem}>
              <Link to={article.link} className={styles.imageLink}>
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt={title}
                    className={styles.beautyImage}
                    onError={(e) => {
                      e.target.style.display = "none"; // или можно показать fallback
                    }}
                  />
                )}
              </Link>

              <div className={styles.content}>
                {firstTag && (
                  <Tag size="big" id={article.tags[0].id}>
                    {firstTag}
                  </Tag>
                )}

                <Link to={article.link} className={styles.titleLink}>
                  <h3>{title}</h3>
                </Link>

                <AuthorTag color="gray" size="m" id={article.author?.id}>
                  {authorName}
                </AuthorTag>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default SimpleHorizontalCard;