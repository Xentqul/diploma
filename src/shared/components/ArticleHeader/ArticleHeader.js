import React, { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext"; // Предположим, что у вас есть ThemeProvider
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import styles from "./ArticleHeader.module.css";

function ArticleHeader({
  id,
  title,
  description,
  tags,
  author,
  publishedAt,
  image,
  initialIsFavorite = false,
}) {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  // Форматируем дату публикации
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Получаем избранные статьи из localStorage
  const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  };

  // Сохраняем избранные статьи в localStorage
  const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const toggleFavorite = () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const favorites = getFavoritesFromLocalStorage();

      if (isFavorite) {
        // Удаляем из избранного
        const updatedFavorites = favorites.filter((favId) => favId !== id);
        saveFavoritesToLocalStorage(updatedFavorites);
        setIsFavorite(false);
      } else {
        // Добавляем в избранное
        saveFavoritesToLocalStorage([...favorites, id]);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Ошибка при обновлении избранного:", error.message);
      alert("Не удалось обновить статус избранного.");
    } finally {
      setIsLoading(false);
    }
  };

  // Проверяем, находится ли статья в избранном при монтировании
  useEffect(() => {
    const favorites = getFavoritesFromLocalStorage();
    setIsFavorite(favorites.includes(id));
  }, [id]);

  return (
    <div>
      <div className={styles.line}></div>
      <div className={styles.articleHeader}>
        {/* Тег статьи */}
        {tags?.[0] && (
          <div className={styles.tagContainer}>
            <Tag size="medium" id={tags[0].id}>
              {tags[0].visible.ru}
            </Tag>
          </div>
        )}

        {/* Заголовок */}
        {title?.ru && <h1 className={styles.title}>{title.ru}</h1>}

        {/* Описание */}
        {description?.ru && (
          <p className={styles.description}>{description.ru}</p>
        )}

        {/* Автор + Дата */}
        <div className={styles.authorDateWrapper}>
          {author?.name?.ru && (
            <AuthorTag
              size="s"
              id={author.id}
              to={`/author/${encodeURIComponent(author.id)}`}
              className={styles.authorLink}
            >
              АВТОР: {author.name.ru.toUpperCase()}
            </AuthorTag>
          )}
          {formattedDate && (
            <span className={styles.publishedLabel}>
              ОПУБЛИКОВАНО: {formattedDate.toUpperCase()}
            </span>
          )}
        </div>

        {/* Кнопка "Избранное" */}
        <button
          onClick={toggleFavorite}
          disabled={isLoading}
          className={
            isFavorite ? styles.favoriteButtonActive : styles.favoriteButton
          }
          aria-label={
            isFavorite ? "Удалить из избранного" : "Добавить в избранное"
          }
        >
          <span className={styles.favoriteIcon}>
            {isFavorite ? (
              <img src="/assets/icons/favoritesOn.png" alt="Избранное" />
            ) : (
              <img src="/assets/icons/favoritesOff.png" alt="Не в избранном" />
            )}
          </span>
          <span className={styles.favoriteText}>
            {isFavorite ? "В избранном" : "В избранное"}
          </span>
        </button>

        {/* Обложка статьи */}
        {image && (
          <div className={styles.imageContainer}>
            <img src={image} alt="Обложка статьи" className={styles.image} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticleHeader;