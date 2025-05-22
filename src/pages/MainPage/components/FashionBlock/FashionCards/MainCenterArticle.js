import styles from "./MainCenterArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

export function MainCenterArticle({ mainArticle }) {
  const currentLang = "ru";

  if (!mainArticle) return <p>Статья не найдена</p>;

  const title = mainArticle.title?.[currentLang] || "Без заголовка";
  const description = mainArticle.description?.[currentLang] || "Нет описания";
  const firstTag =
    mainArticle.tags?.[0]?.visible?.[currentLang] ||
    mainArticle.tags?.[0]?.id ||
    "#мода";
  const authorName =
    mainArticle.author?.name?.[currentLang] ||
    mainArticle.author?.name ||
    "Неизвестный автор";

  // Берём первую картинку из данных статьи
  const featuredImage = mainArticle.images?.[0];

  return (
    <article className={styles.mainFashionArticle}>
      <div className={styles.wrapper}>
        {/* Картинка */}
        <Link to={mainArticle.link} className={styles.imageLink}>
          {featuredImage && (
            <img
              src={featuredImage}
              alt={title}
              className={styles.featuredImage}
              onError={(e) => {
                e.target.style.display = "none"; // скрываем, если ошибка
              }}
            />
          )}
        </Link>

        {/* Контент */}
        <div className={styles.textContent}>
          {/* Тег */}
          {mainArticle.tags.length > 0 && (
            <Tag size="medium" underline="underlined_black" noHover={true} id={mainArticle.tags[0].id}>
              {firstTag}
            </Tag>
          )}

          {/* Заголовок */}
          <Link to={mainArticle.link} className={styles.mainName}>
            <h3>{title}</h3>
          </Link>

          {/* Описание */}
          <p className={styles.descr}>{description}</p>

          {/* Автор */}
          <div className={styles.authorWrapper}>
            <span>рассказывает</span>
            {mainArticle.author && (
              <AuthorTag
                className={styles.italic}
                size="m"
                id={mainArticle.author.id}
              >
                {authorName.toUpperCase()}
              </AuthorTag>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default MainCenterArticle;