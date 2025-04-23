import styles from "./SimpleHorizontalCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { BeautyCardsData } from "./BeautyCardsData.js";

export function SimpleHorizontalCard() {
  return (
    <div className={styles.wrapper}>
  <div className={styles.grid}>
    {BeautyCardsData.map((article) => (
      <article key={article.id} className={styles.beautyItem}>
        {/* Ссылка на статью */}
        <a href={article.articleTag} className={styles.imageLink}>
          {/* Изображение */}
          <img
            src={article.image}
            alt={article.title}
            className={styles.beautyImage}
          />
        </a>

        {/* Контент */}
        <div className={styles.content}>
          {/* Тег */}
          <Tag size="big" href={article.tag}>
            {article.tag}
          </Tag>

          {/* Заголовок */}
          <a href={article.articleTag} className={styles.titleLink}>
            <h3>{article.title}</h3>
          </a>

          {/* Автор */}
          <AuthorTag color="gray" size="xl" href={`/authors/${article.authorId}`}>
            {article.author}
          </AuthorTag>
        </div>
      </article>
    ))}
  </div>
</div>
  );
}
