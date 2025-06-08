import styles from "./SeasonalCard.module.css";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Tag } from "@/shared/ui/Tag/Tag";
import { Link } from "react-router-dom";

export default function SeasonalCard({ card, lang = "ru" }) {
  if (!card) return null;

  const title = card.title?.[lang] || "Без заголовка";
  const description = card.description?.[lang] || "Нет описания";
  const imageSrc = card.images?.[0]; // Берём путь к изображению из JSON

  return (
    <div className={styles.card}>
      <Link to={`/article/${card.slug}`} className={styles.imageWrapper}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className={styles.image}
            onError={(e) => {
              e.target.style.display = "none"; // или можно подставить fallback
            }}
          />
        )}
      </Link>

      <div className={styles.content}>
        <Link to={`/article/${card.slug}`} className={styles.link}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <AuthorTag id={card.author.id} color="gray" size="s">
            автор:{" "}
            {card.author.name?.[lang] || card.author.name || "Неизвестный автор"}
          </AuthorTag>

          <Tag id={card.tags?.[0]?.id}>
            {card.tags?.[0]?.visible?.[lang] ||
              card.tags?.[0]?.visible?.en ||
              "#тренд"}
          </Tag>
        </div>
      </div>
    </div>
  );
}