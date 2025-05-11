import React, { useContext, useEffect } from "react";
import styles from "./FirstArticleCard.module.css";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import articles from "@/data/articles.json";
import firstMainPic from "@/assets/main-pics/first-main-pic.webp";
import { ArticleContext } from "@/context/ArticleContext";

function FirstArticleCard() {
  const currentLang = "ru";
  const { usedArticles, markArticleAsUsed } = useContext(ArticleContext);

  // 1. Находим самую свежую статью категории "мода"
  const mainArticle = articles
    .filter(article => 
      article.category?.ru === "мода" && 
      article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  // 2. Помечаем ее как использованную
  useEffect(() => {
    if (mainArticle?.id && !usedArticles.includes(mainArticle.id)) {
      markArticleAsUsed(mainArticle.id);
      console.log('Главная статья помечена:', mainArticle.id, mainArticle.title.ru);
    }
  }, [mainArticle, usedArticles, markArticleAsUsed]);

  if (!mainArticle) return <p>Статья не найдена</p>;

  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          <Tag href={`/tags/${mainArticle.tags[0].id}`} size="big">
            {mainArticle.tags[0].visible[currentLang]}
          </Tag>

          <a className={styles.h1} href={mainArticle.link}>
            <h1>{mainArticle.title[currentLang]}</h1>
          </a>

          <p>{mainArticle.description[currentLang]}</p>

          <AuthorTag href={`/authors/${mainArticle.author.id}`}>
            автор: {mainArticle.author.name[currentLang]}
          </AuthorTag>

          <LinkButton className={styles.linkButtonMargin}>к коллекции</LinkButton>
        </div>

        <img
          className={styles.mainPic}
          src={firstMainPic}
          alt={mainArticle.title[currentLang]}
        />
      </div>
    </section>
  );
}

export default FirstArticleCard;