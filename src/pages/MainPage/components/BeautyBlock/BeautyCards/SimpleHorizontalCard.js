import styles from "./SimpleHorizontalCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

// прямой импорт
import beauty1 from "@/assets/main-pics/beauty/beauty-1.webp";
import beauty2 from "@/assets/main-pics/beauty/beauty-2.webp";
import beauty3 from "@/assets/main-pics/beauty/beauty-3.webp";
import beauty4 from "@/assets/main-pics/beauty/beauty-4.webp";

// Сопоставление ID статей с картинками
const IMAGE_MAP = {
  19: beauty1,
  20: beauty2,
  21: beauty3,
  22: beauty4,
};

export function SimpleHorizontalCard({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {articles.map((article) => {
          const imageSrc = IMAGE_MAP[article.id] || "";
          const title = article.title?.ru || "";
          const authorName = article.author?.name?.ru || "";
          const firstTag = article.tags?.[0]?.visible?.ru || "";

          return (
            <article key={article.id} className={styles.beautyItem}>
              <Link to={article.link} className={styles.imageLink}>
                <img
                  src={imageSrc}
                  alt={title}
                  className={styles.beautyImage}
                  onError={(e) => {
                    e.target.src = "";
                    e.target.onerror = null;
                  }}
                />
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
