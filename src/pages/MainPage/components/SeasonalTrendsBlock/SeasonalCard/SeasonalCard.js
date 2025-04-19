import styles from './SeasonalCard.module.css';
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Tag } from "@/shared/ui/Tag/Tag";

export default function SeasonalCard({ card }) {
  return (
    <div className={styles.card}>
      <a href={`/articles/${card.id}`} className={styles.imageLink}>
        <img src={card.image} alt={card.title} className={styles.image} />
      </a>

      <div className={styles.content}>
        <a href={`/articles/${card.id}`} className={styles.link}>
          <h3 className={styles.title}>{card.title}</h3>
        </a>

        <p className={styles.description}>{card.description}</p>

        <div className={styles.footer}>
          <AuthorTag href={`/authors/${card.authorId}`} size="m" color="gray" weight="weightRegular">
            {card.author}
          </AuthorTag>

          <Tag href={`/tags/${card.tag.replace("#", "")}`}>
            {card.tag}
          </Tag>
        </div>
      </div>
    </div>
  );
}
