import styles from "./PhotoContentButtonCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag.js";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Link } from "react-router-dom";

// Импортируем картинки напрямую
import artPhotoDesktop from "@/assets/main-pics/main-article-art&photo.webp";
import artPhotoMobile from "@/assets/main-pics/mobile-main-article-art&photo.webp";

function PhotoContentButtonCard({ article }) {
  if (!article) return null;

  const title = article.title?.ru || "";
  const description = article.description?.ru || "";
  const firstTag = article.tags?.[0]?.visible?.ru || "";

  return (
    <div className={styles.cardContainer}>
      <article className={styles.card}>
        {/* Десктоп изображение */}
        <Link to={article.link}>
          <img
            src={artPhotoDesktop}
            alt={title}
            className={styles.desktopImage}
            onError={(e) => {
              e.target.src = "";
              e.target.onerror = null;
            }}
          />
        </Link>
        
        {/* Мобильное изображение */}
        <Link to={article.link}>
          <img
            src={artPhotoMobile}
            alt={title}
            className={styles.mobileImage}
            onError={(e) => {
              e.target.src = "";
              e.target.onerror = null;
            }}
          />
        </Link>
        
        {/* Контент */}
        <div className={styles.content}>
          {firstTag && (
            <Tag size="large" href={`/tag/${article.tags[0].id}`}>
              {firstTag}
            </Tag>
          )}
          
          <Link to={article.link} className={styles.titleLink}>
            <h2 className={styles.title}>{title}</h2>
          </Link>
          
          <p className={styles.description}>{description}</p>
          <LinkButton to={article.link}>Читать</LinkButton>
        </div>
      </article>
    </div>
  );
}
export default PhotoContentButtonCard;