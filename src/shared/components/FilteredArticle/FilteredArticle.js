import styles from "./FilteredArticle.module.css";
import { Link } from "react-router-dom";

// Функция форматирования даты
const formatDate = (dateString, lang = "ru") => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat(lang === "ru" ? "ru-RU" : "en-US", options).format(date);
};

// Компонент карточки статьи
export const FilteredArticleCard = ({ article, lang = "ru" }) => {
  const { title, description, images, tags, link, author, publishedAt } = article;

  return (
    <Link to={link} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={images[0]} alt={title[lang] || "Без заголовка"} className={styles.image} />
        </div>

        <div className={styles.content}>
          {/* Множество тегов */}
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag.visible[lang] || tag.id}
              </span>
            ))}
          </div>

          {/* Заголовок */}
          <h3 className={styles.title}>{title[lang] || "Без заголовка"}</h3>

          {/* Описание */}
          <p className={styles.description}>{description[lang] || "Нет описания"}</p>

          {/* Нижняя часть: автор + дата */}
          <div className={styles.footer}>
            <span className={styles.author}>{author?.name?.[lang] || author?.id || "Неизвестный автор"}</span>
            <time className={styles.date} dateTime={publishedAt}>
              {formatDate(publishedAt, lang)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};