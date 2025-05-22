import styles from "./FilteredArticle.module.css";
import { Link } from "react-router-dom";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";

// Функция форматирования даты
const formatDate = (dateString, lang = "ru") => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat(
    lang === "ru" ? "ru-RU" : "en-US",
    options
  ).format(date);
};

// Компонент карточки статьи
export const FilteredArticleCard = ({ article, lang = "ru" }) => {
  const { title, description, images, tags, link, author, publishedAt } =
    article;

  return (
    <Link to={link} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageWrapper}>
          <img
            src={images[0]}
            alt={title[lang] || "Без заголовка"}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          {/* Множество тегов */}
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <Tag key={index} id={tag.id} size="small">
                {tag.visible[lang] || tag.id}
              </Tag>
            ))}
          </div>

          {/* Заголовок */}
          <h3 className={styles.title}>{title[lang] || "Без заголовка"}</h3>

          {/* Описание */}
          <p className={styles.description}>
            {description[lang] || "Нет описания"}
          </p>

          {/* Нижняя часть: автор + дата */}
          <div className={styles.footer}>
            <AuthorTag id={author?.id} size="s" color="gray">
              {author?.name?.[lang] || author?.id || "Неизвестный автор"}
            </AuthorTag>
            <time className={styles.date} dateTime={publishedAt}>
              {formatDate(publishedAt, lang)}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
};
