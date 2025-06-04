import React from "react";
import styles from "./ArticleHeader.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";

function ArticleHeader({
  title,
  description,
  tags,
  author,
  publishedAt,
  image, // Новый пропс для обложки
  isFavorite = false,
}) {
  // Форматируем дату публикации
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div>
      <div className={styles.line}></div>
    <div className={styles.articleHeader}>
      {/* 1. Тег статьи */}
      {tags?.[0]?.visible?.ru && (
        <div className={styles.tagContainer}>
          <Tag>{tags[0].visible.ru}</Tag>
        </div>
      )}

      {/* 3. Заголовок */}
      {title?.ru && <h1 className={styles.title}>{title.ru}</h1>}

      {/* 4. Описание статьи */}
      {description?.ru && (
        <p className={styles.description}>{description.ru}</p>
      )}

      {/* 5. Автор + Дата */}
      <div className={styles.authorDateWrapper}>
        {author?.name?.ru && (
          <AuthorTag>АВТОР: {author.name.ru.toUpperCase()}</AuthorTag>
        )}
        {formattedDate && (
          <span className={styles.publishedLabel}>
            ОПУБЛИКОВАНО: {formattedDate.toUpperCase()}
          </span>
        )}
      </div>

      {/* 6. Кнопка "Избранное" */}
      <button
        className={
          isFavorite ? styles.favoriteButtonActive : styles.favoriteButton
        }
      >
        <span className={styles.favoriteIcon}>
          {isFavorite ? (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="#e74c3c"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
            </svg>
          )}
        </span>
        <span className={styles.favoriteText}>
          {isFavorite ? "В избранном" : "В избранное"}
        </span>
      </button>

      {/* 1. Обложка статьи */}
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt="Обложка статьи" className={styles.image} />
        </div>
      )}
    </div></div>
  );
}

export default ArticleHeader;
