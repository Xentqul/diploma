import styles from "./AllContentCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";

// 1. Прямые импорты изображений
import fashionAside1 from "@/assets/main-pics/fashion/fashion-aside-1.webp";
import fashionAside2 from "@/assets/main-pics/fashion/fashion-aside-2.webp";
import fashionAside3 from "@/assets/main-pics/fashion/fashion-aside-3.webp";

export function AllContentCard({ variant = "default", data = [] }) {
  const currentLang = "ru";

  // 2. Жестко привязываем изображения к данным
  const articlesWithImages = data.map((article, index) => {
    let image;
    switch (index) {
      case 0:
        image = fashionAside1;
        break;
      case 1:
        image = fashionAside2;
        break;
      case 2:
        image = fashionAside3;
        break;
      default:
        image = fashionAside1;
    }
    return { ...article, image };
  });

  return (
    <div
      className={`${styles.asideArticle} ${
        variant === "vertical" ? styles.flexAlign : ""
      }`}
    >
      {articlesWithImages.map((article) => (
        <article
          key={article.id}
          className={`${styles.wrapperAsideArticle} ${
            variant === "vertical" ? styles.verticalVariant : ""
          }`}
        >
          <Link to={article.link}>
            <img
              src={article.image}
              alt={article.title?.[currentLang] || "Без заголовка"}
              className={`${styles.asideImage} ${
                variant === "vertical" ? styles.verticalImage : ""
              }`}
            />
          </Link>

          <div
            className={`${styles.asideContent} ${
              variant === "vertical" ? styles.verticalContent : ""
            }`}
          >
            {article.tags && article.tags.length > 0 && (
              <Tag size="small" href={`/tags/${article.tags[0].id}`}>
                {article.tags[0].visible?.[currentLang] || article.tags[0].id}
              </Tag>
            )}

            <Link to={article.link} className={styles.linkUnderline}>
              <h3 className={styles.asideTitle}>
                {article.title?.[currentLang] || "Без заголовка"}
              </h3>
            </Link>

            {article.description?.[currentLang] && (
              <p className={styles.asideDescription}>
                {article.description[currentLang]}
              </p>
            )}

            {article.author && (
              <AuthorTag
                size="s"
                color="gray"
                href={`/authors/${article.author.id}`}
              >
                {article.author.name?.[currentLang] ||
                  article.author.name ||
                  "Неизвестный автор"}
              </AuthorTag>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
