import styles from "./FashionBlock.module.css";
import { MainCenterArticle } from "./FashionCards/MainCenterArticle";
import { AllContentCard } from "./FashionCards/AllContentCard";
import React, { useContext } from "react";
import articles from "@/data/articles.json";
import { ArticleContext } from "@/context/ArticleContext";

function FashionBlock() {
  const { usedArticles } = useContext(ArticleContext);

  // 1. Получаем ВСЕ статьи моды, кроме главной (которая в usedArticles)
  const allFashionArticles = articles
    .filter(article => 
      article.category?.ru === "мода" && 
      article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // 2. Главная статья блока моды - первая из НЕиспользованных
  const mainFashionArticle = allFashionArticles
    .find(article => !usedArticles.includes(article.id));

  // 3. Боковые статьи - следующие 3 после главной, исключая usedArticles
  const sideArticles = allFashionArticles
    .filter(article => 
      article.id !== mainFashionArticle?.id && 
      !usedArticles.includes(article.id)
    )
    .slice(0, 3);

  return (
    <section className={styles.fourthSection}>
      <div className={styles.wrapper}>
        <h2>МОДА</h2>
        <div className={styles.container}>
          {mainFashionArticle && (
            <MainCenterArticle mainArticle={mainFashionArticle} />
          )}

          <div className={styles.containerAside}>
            <AllContentCard data={sideArticles} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FashionBlock;