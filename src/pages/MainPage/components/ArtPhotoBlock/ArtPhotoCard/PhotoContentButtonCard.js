import styles from "./PhotoContentButtonCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { ArtPhotoCardData } from "./ArtPhotoCardData.js";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";

function PhotoContentButtonCard() {
  return (
    <div className={styles.cardContainer}>
      {ArtPhotoCardData.map((article) => (
        <article key={article.id} className={styles.card}>
          {/*------ фото для десктопа ---------*/}
          <img
            src={article.desktopImage}
            alt={article.title}
            className={styles.desktopImage}
          />
          {/*------- фото для мобильной версии --------*/}
          <img
            src={article.mobileImage}
            alt={article.title}
            className={styles.mobileImage}
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
