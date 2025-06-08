import styles from "./PhotoContentButtonCard.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Link } from "react-router-dom";

function PhotoContentButtonCard({ article }) {
  if (!article) return null;

  const title = article.title?.ru || "";
  const description = article.description?.ru || "";
  const firstTag = article.tags?.[0]?.visible?.ru || "";

  // Динамически берём изображения из article.images
  const desktopImage = article.images?.[0];
  const mobileImage = article.images?.[1] || desktopImage; // если второго нет — используем первое

  return (
    <div className={styles.cardContainer}>
      <article className={styles.card}>
        {/* Десктоп изображение */}
        <Link to={article.link}>
          {desktopImage && (
            <img
              src={desktopImage}
              alt={title}
              className={styles.desktopImage}
              onError={(e) => {
                e.target.src = ""; // можно заменить на fallback
                e.target.onerror = null;
              }}
            />
          )}
        </Link>

        {/* Мобильное изображение */}
        <Link to={article.link}>
          {mobileImage && (
            <img
              src={mobileImage}
              alt={title}
              className={styles.mobileImage}
              onError={(e) => {
                e.target.src = "";
                e.target.onerror = null;
              }}
            />
          )}
        </Link>

        {/* Контент */}
        <div className={styles.content}>
          {firstTag && (
            <Tag size="large" id={article.tags[0].id}>
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
