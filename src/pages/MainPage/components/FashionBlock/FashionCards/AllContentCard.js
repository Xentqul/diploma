import styles from "./AllContentCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag.js";

export function AllContentCard({
  variant = "default", // 'default' | 'vertical'
  data = [],
  excludeFeatured = true, // опция исключает isFeatured статьи
}) {
  // фильтр, чтобы главная статья блока не отображалась сбоку
  const filteredData = excludeFeatured
    ? data.filter((item) => !item.isFeatured)
    : data;

  return (
    <div className={`${styles.asideArticle} ${variant === "vertical" ? styles.flexAlign : ""}`}>
      {filteredData.map((article) => (
        <article
          key={article.id}
          className={`${styles.wrapperAsideArticle} ${variant === "vertical" ? styles.verticalVariant : ""}`}
        >
          <a href={article.articleTag}>
            <img
              src={article.image}
              alt={article.title}
              className={`${styles.asideImage} ${variant === "vertical" ? styles.verticalImage : ""}`}
            />
          </a>

          <div className={`${styles.asideContent} ${variant === "vertical" ? styles.verticalContent : ""}`}>
            <Tag size="small" href={article.tag}>
              {article.tag}
            </Tag>

            <a className={styles.linkUnderline} href={article.articleTag}>
              <h3 className={styles.asideTitle}>{article.title}</h3>
            </a>

            {article.description && (
              <p className={styles.asideDescription}>{article.description}</p>
            )}

            <AuthorTag size="s" color="gray" href={`/authors/${article.authorId}`}>
              {article.author}
            </AuthorTag>
          </div>
        </article>
      ))}
    </div>
  );
}