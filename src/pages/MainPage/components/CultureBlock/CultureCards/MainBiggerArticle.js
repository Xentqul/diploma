import styles from "./MainBiggerArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function MainBiggerArticle({ article }) {
  if (!article) return null;

  const title = article.title?.ru || "";
  const description = article.description?.ru || "";
  const authorName = article.author?.name?.ru || "";
  const firstTag = article.tags?.[0]?.visible?.ru || "";

  // Берём первую картинку из данных статьи
  const imageSrc = article.images?.[0];

  return (
    <div className={styles.wrapper}>
      {/* Картинка из данных статьи */}
      <Link to={article.link}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            className={styles.mainImage}
            onError={(e) => {
              e.target.style.display = "none"; // или заменить на fallback
            }}
          />
        ) : (
          <div className={styles.fallbackImage}>Нет изображения</div>
        )}
      </Link>

      <div className={styles.textContent}>
        {/* Тег */}
        {firstTag && (
          <Tag id={article.tags[0].id} size="big">
            {firstTag}
          </Tag>
        )}

        {/* Заголовок */}
        <Link to={article.link} className={styles.wrapperForTitle}>
          <h3>{title}</h3>
        </Link>

        {/* Описание */}
        {description && <p className={styles.description}>{description}</p>}

        {/* Автор */}
        <div className={styles.combinate}>
          <span>РАССКАЗЫВАЕТ ДЛЯ ВАС </span>
          <AuthorTag id={article.author?.id} size="m" color="gray">
            {authorName.toUpperCase() || "НЕИЗВЕСТНЫЙ АВТОР"}
          </AuthorTag>
        </div>
      </div>
    </div>
  );
}

export default MainBiggerArticle;