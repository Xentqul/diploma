// src/pages/MainPage/components/FirstArticleCard/FirstArticleCard.jsx
import React, { useContext, useEffect } from "react";
import styles from "./FirstArticleCard.module.css";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import articles from "@/data/articles.json";
import firstMainPic from "@/assets/main-pics/first-main-pic.webp";
import { ArticleContext } from "@/context/ArticleContext";
import { getLatestArticle } from "@/shared/utils/getLatestArticle";

function FirstArticleCard() {
  const currentLang = "ru";
  const { usedArticles, markArticleAsUsed } = useContext(ArticleContext);

  // Получаем самую свежую статью из категории "мода"
  const article = getLatestArticle(articles, "мода");

  useEffect(() => {
    if (article?.id && !usedArticles.includes(article.id)) {
      markArticleAsUsed(article.id);
    }
  }, [article, usedArticles, markArticleAsUsed]);

  if (!article) return <p>Статья не найдена</p>;

  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          {/* Тег */}
          <Tag href={`/tags/${article.tags[0].id}`} size="big">
            {article.tags[0].visible[currentLang]}
          </Tag>

          {/* Заголовок */}
          <a className={styles.h1} href={article.link}>
            <h1>{article.title[currentLang]}</h1>
          </a>

          {/* Описание */}
          <p>{article.description[currentLang]}</p>

          {/* Автор */}
          <AuthorTag href={`/authors/${article.author.id}`}>
            автор: {article.author.name[currentLang]}
          </AuthorTag>

          {/* Кнопка */}
          <LinkButton className={styles.linkButtonMargin}>к коллекции</LinkButton>
        </div>

        {/* Изображение */}
        <img
          className={styles.mainPic}
          src={firstMainPic}
          alt={article.title[currentLang]}
        />
      </div>
    </section>
  );
}

export default FirstArticleCard;