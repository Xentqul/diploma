import styles from "./MainCenterArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

// Импортируем изображение напрямую
import mainArticleImg from "@/assets/main-pics/fashion/main-fashion-article.webp";

// Маппинг путей к изображениям
const images = {
  "/assets/main-pics/fashion/main-fashion-article.webp": mainArticleImg,
};

export function MainCenterArticle({ mainArticle }) {
  const currentLang = "ru";

  if (!mainArticle) return <p>Статья не найдена</p>;

  const featuredImage = mainArticle.images?.[0]
    ? images[mainArticle.images[0]]
    : null;

  return (
    <article className={styles.mainFashionArticle}>
      <div className={styles.wrapper}>
        <Link to={mainArticle.link} className={styles.imageLink}>
          <img
            src={featuredImage}
            alt={mainArticle.title[currentLang]}
            className={styles.featuredImage}
          />
        </Link>

        <div className={styles.textContent}>
          {/* Используем id вместо href */}
          {mainArticle.tags.length > 0 && (
            <Tag size="medium" underline="underlined_black" noHover={true} id={mainArticle.tags[0].id}>
              {mainArticle.tags[0]?.visible?.[currentLang] || "#мода"}
            </Tag>
          )}

          <Link to={mainArticle.link} className={styles.mainName}>
            <h3>{mainArticle.title[currentLang]}</h3>
          </Link>

          <p className={styles.descr}>{mainArticle.description[currentLang]}</p>

          <div className={styles.authorWrapper}>
            <span>рассказывает</span>
            {mainArticle.author && (
              <AuthorTag
                className={styles.italic}
                size="m"
                id={mainArticle.author.id}
              >
                {mainArticle.author.name[currentLang]?.toUpperCase() ||
                  mainArticle.author.name?.toUpperCase() ||
                  "Неизвестный автор"}
              </AuthorTag>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}