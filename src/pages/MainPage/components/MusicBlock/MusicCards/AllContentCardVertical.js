import React from "react";
import styles from "./AllContentCardVertical.module.css";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Link } from "react-router-dom";
import articles from "@/data/articles.json";

export function AllContentCardVertical({ data = [], tagId, authorId }) {
  const currentLang = "ru";

  // Если передан tagId — фильтруем по тегу
  let filteredData = [...data];

  if (tagId) {
    filteredData = articles.filter((article) =>
      article.tags.some((tag) => tag.id === tagId)
    );
  }

  // Если передан authorId — фильтруем по автору
  if (authorId) {
    filteredData = articles.filter(
      (article) => article.author?.id === authorId
    );
  }

  return (
    <div className={`${styles.asideArticle} ${styles.flexAlign}`}>
      {filteredData.map((article) => (
        <article
          key={article.id}
          className={`${styles.wrapperAsideArticle} ${styles.verticalVariant}`}
        >
          <Link to={article.link}>
            <img
              src={article.image}
              alt={article.title?.[currentLang] || "Без заголовка"}
              className={`${styles.asideImage} ${styles.verticalImage}`}
            />
          </Link>

          <div className={`${styles.asideContent} ${styles.verticalContent}`}>
            {article.tags && article.tags.length > 0 && (
              <Tag id={article.tags[0].id} size="small">
                {article.tags[0].visible?.[currentLang] || article.tags[0].id}
              </Tag>
            )}

            <Link to={article.link} className={styles.linkUnderline}>
              <h3 className={styles.asideTitle}>
                {article.title?.[currentLang] || "Без заголовка"}
              </h3>
            </Link>

            {article.description?.[currentLang] && (
              <p className={styles.asideDescription}>
                {article.description[currentLang]}
              </p>
            )}

            {article.author && (
              <AuthorTag id={article.author.id} size="s" color="gray">
                {article.author.name?.[currentLang] ||
                  article.author.name ||
                  "Неизвестный автор"}
              </AuthorTag>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}