import styles from "./HorizontalWideArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

// Импортируем картинки напрямую
import asideLeft1 from "@/assets/main-pics/culture/culture-aside-left-1.webp";
import asideLeft2 from "@/assets/main-pics/culture/culture-aside-left-2.webp";
import asideRight1 from "@/assets/main-pics/culture/culture-aside-right-1.webp";
import asideRight2 from "@/assets/main-pics/culture/culture-aside-right-2.webp";

// Сопоставляем ID статей с картинками
const IMAGE_MAP = {
  15: asideLeft1, // ID статьи = картинка
  16: asideLeft2,
  17: asideRight1,
  18: asideRight2
};

export function HorizontalWideArticle({ articles }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className={styles.asideContainer}>
      {articles.map((article) => {
        const title = article.title?.ru || "";
        const authorName = article.author?.name?.ru || "";
        const firstTag = article.tags?.[0]?.visible?.ru || "";
        const imageSrc = IMAGE_MAP[article.id] || ""; // Берем картинку по ID статьи

        return (
          <article key={article.id} className={styles.asideItem}>
            <Link to={article.link} className={styles.imageLink}>
              <img
                src={imageSrc}
                alt={title}
                className={styles.asideImage}
              />
            </Link>

            <div className={styles.content}>
              {firstTag && (
                <Tag size="medium" href={`/tag/${article.tags[0].id}`}>
                  {firstTag}
                </Tag>
              )}

              <Link className={styles.linkForTitle} to={article.link}>
                <h3 className={styles.title}>{title}</h3>
              </Link>

              <AuthorTag
                href={`/authors/${article.author?.id}`}
                className={styles.author}
                color="gray"
                size="s"
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