import styles from "./SeasonalCard.module.css";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Tag } from "@/shared/ui/Tag/Tag";
import { Link } from "react-router-dom";

// Импортируем изображения
import seasonal1 from "@/assets/main-pics/seasonal-trends/seasonal-1.webp";
import seasonal2 from "@/assets/main-pics/seasonal-trends/seasonal-2.webp";
import seasonal3 from "@/assets/main-pics/seasonal-trends/seasonal-3.webp";
import seasonal4 from "@/assets/main-pics/seasonal-trends/seasonal-4.webp";

// Создаем объект с маппингом путей к изображениям
const images = {
  "/assets/main-pics/seasonal-trends/seasonal-1.webp": seasonal1,
  "/assets/main-pics/seasonal-trends/seasonal-2.webp": seasonal2,
  "/assets/main-pics/seasonal-trends/seasonal-3.webp": seasonal3,
  "/assets/main-pics/seasonal-trends/seasonal-4.webp": seasonal4,
};

export default function SeasonalCard({ card, lang = "ru" }) {
  const title = card.title[lang];
  const description = card.description[lang];

  // Получаем правильное изображение по пути
  const imageSrc = images[card.images[0]];

  return (
    <div className={styles.card}>
      <Link to={`/articles/${card.slug}`} className={styles.imageWrapper}>
        <img
          src={imageSrc} // Используем импортированное изображение
          alt={title}
          className={styles.image}
          onError={(e) => (e.target.src = "/path/to/default-image.webp")} // Плейсхолдер при ошибке
        />
      </Link>

      <div className={styles.content}>
        <a href={`/articles/${card.slug}`} className={styles.link}>
          <h3 className={styles.title}>{title}</h3>
        </a>

        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <AuthorTag
            id={card.author.id}
            color="gray"
            size="s"
            weight="weightRegular"
          >
            автор:{" "}
            {card.author.name[lang] || card.author.name || "Неизвестный автор"}
          </AuthorTag>

          <Tag id={card.tags[0].id}>
            {card.tags[0].visible[lang] ||
              card.tags[0].visible.en ||
              card.tags[0].id}
          </Tag>
        </div>
      </div>
    </div>
  );
}
