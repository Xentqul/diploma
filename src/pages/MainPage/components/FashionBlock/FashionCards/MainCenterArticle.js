import { FashionCardsData } from "./FashionCardsData";
import styles from "./MainCenterArticle.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag.js";

export function MainCenterArticle() {
  const featuredArticle = FashionCardsData.find((item) => item.isFeatured);

  return (
    <article className={styles.mainFashionArticle}>
      <div className={styles.wrapper}>
        <a href={featuredArticle.articleTag}>
          <img
            src={featuredArticle.image}
            alt={featuredArticle.title}
            className={styles.featuredImage}
          />
        </a>

        <div className={styles.textContent}>
          <Tag
            size="medium"
            underline="underlined_black"
            noHover="true"
            href={featuredArticle.tag}
          >
            {featuredArticle.tag}
          </Tag>

          <a className={styles.mainName} href={featuredArticle.articleTag}>
            <h3>{featuredArticle.title}</h3>
          </a>

          <p className={styles.descr}>{featuredArticle.description}</p>

          <div className={styles.authorWrapper}>
            <span>рассказывает</span>
            <AuthorTag
              className={styles.italic}
              size="m"
              href={`/authors/${featuredArticle.authorId}`}
            >
              {featuredArticle.author}
            </AuthorTag>
          </div>
        </div>
      </div>
    </article>
  );
}
