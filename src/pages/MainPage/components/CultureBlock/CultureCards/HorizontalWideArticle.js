import styles from "./HorizontalWideArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";

export function HorizontalWideArticle({ articles }) {
  return (
    <div className={styles.asideContainer}>
      {articles.map((article) => (
        <article key={article.id} className={styles.asideItem}>
          <a href={article.articleTag} className={styles.imageLink}>
            <img
              src={article.image}
              alt={article.title}
              className={styles.asideImage}
            />
          </a>

          <div className={styles.content}>
            <Tag size="medium" href={article.tag}>
              {article.tag}
            </Tag>

            <a className={styles.linkForTitle} href={article.articleTag}>
              <h3 className={styles.title}>{article.title}</h3>
            </a>

            <AuthorTag 
              href={`/authors/${article.authorId}`}
              className={styles.author}
            >
              {article.author}
            </AuthorTag>
          </div>
        </article>
      ))}
    </div>
  );
}
