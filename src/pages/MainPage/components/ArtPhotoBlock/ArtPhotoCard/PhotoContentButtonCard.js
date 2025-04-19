import styles from "./PhotoContentButtonCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { ArtPhotoCardData } from "./ArtPhotoCardData.js";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";

function PhotoContentButtonCard() {
  return (
    <div className={styles.cardContainer}>
      {ArtPhotoCardData.map((article) => (
        <article key={article.id} className={styles.card}>
          <img
            src={article.image}
            alt={article.title}
            className={styles.image}
          />
          <div className={styles.content}>
            <Tag size="large" href={article.tag}>
              {article.tag}
            </Tag>
            <a href={article.articleTag} className={styles.titleLink}>
              <h2 className={styles.title}>{article.title}</h2>
            </a>
            <p className={styles.description}>{article.description}</p>
            <LinkButton>Читать</LinkButton>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PhotoContentButtonCard;
