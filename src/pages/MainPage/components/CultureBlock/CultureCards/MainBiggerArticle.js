import styles from "./MainBiggerArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag.js";
import { Link } from "react-router-dom";

// Импортируем изображение напрямую
import mainCultureImage from "@/assets/main-pics/culture/main-culture-article.webp";

export function MainBiggerArticle({ article }) {
  if (!article) return null;

  const title = article.title?.ru || "";
  const description = article.description?.ru || "";
  const authorName = article.author?.name?.ru || "";
  const firstTag = article.tags?.[0]?.visible?.ru || "";

  return (
    <div className={styles.wrapper}>
      <Link to={article.link}>
        <img
          src={mainCultureImage} // Используем импортированное изображение
          alt={title}
          className={styles.mainImage}
          onError={(e) => {
            e.target.src = ''; // Очищаем src при ошибке
            e.target.onerror = null;
          }}
        />
      </Link>

      <div className={styles.textContent}>
        {firstTag && (
          <Tag id={article.tags[0].id} size="big">
            {firstTag}
          </Tag>
        )}

        <Link to={article.link} className={styles.wrapperForTitle}>
          <h3>{title}</h3>
        </Link>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.combinate}>
          <span>РАССКАЗЫВАЕТ ДЛЯ ВАС </span>
          <AuthorTag
            id={article.author?.id}
            size="m"
            color="gray"
          >
            {authorName.toUpperCase()}
          </AuthorTag>
        </div>
      </div>
    </div>
  );
}