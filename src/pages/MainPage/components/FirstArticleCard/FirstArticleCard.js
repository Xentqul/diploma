import styles from "./FirstArticleCard.module.css";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { FirstArticleData } from "./FirstArticleData.js"; // Импорт данных

function FirstArticleCard() {
  const article = FirstArticleData[0]; // Берем первую статью из массива

  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          <Tag 
            href={article.articleTag} 
            size="big" 
            underline="underlined_black" 
            noHover="true"
          >
            {article.tag}
          </Tag>

          <a className={styles.h1} href={article.articleTag}>
            <h1>{article.title}</h1>
          </a>

          <p>{article.description}</p>
          
          <AuthorTag 
            href={`/authors/${article.authorId}`} 
            className={styles.paddingA}
          >
            автор: {article.author}
          </AuthorTag>
          
          <LinkButton className={styles.linkButtonMargin}>
            к коллекции
          </LinkButton>
        </div>
        <img 
          className={styles.mainPic} 
          src={article.image} 
          alt={article.title} 
        />
      </div>
    </section>
  );
}

export default FirstArticleCard;