import styles from "./MainBiggerArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag.js";

export function MainBiggerArticle({ article }) {
  return (
    <div className={styles.wrapper}>
      <a href={article.articleTag}>
        <img
          src={article.image}
          alt={article.title}
          className={styles.mainImage}
        />
      </a>

      <div className={styles.textContent}>
        <Tag href={article.tag} size="big">
          {article.tag}
        </Tag>

        <a href={article.articleTag} className={styles.wrapperForTitle}>
          <h3>{article.title}</h3>
        </a>

        {article.description && (
          <p className={styles.description}>{article.description}</p>
        )}

        <div className={styles.combinate}>
          <span>КАК БЫЛО СКАЗАНО </span>
          <AuthorTag href={`/authors/${article.authorId}`} size="m" color="gray">
            {article.author}
          </AuthorTag>
        </div>
      </div>
    </div>
  );
}
