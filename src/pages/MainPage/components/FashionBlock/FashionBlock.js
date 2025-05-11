import styles from "./FashionBlock.module.css";
import { MainCenterArticle } from "./FashionCards/MainCenterArticle";
import { AllContentCard } from "./FashionCards/AllContentCard";
import React, { useContext } from "react";
import articles from "@/data/articles.json";
import { ArticleContext } from "@/context/ArticleContext";

function FashionBlock() {
const { usedArticles } = useContext(ArticleContext);

  // Главная статья блока моды - самая свежая после главной статьи сайта
  const mainFashionArticle = articles
    .filter(a => 
      a.category?.ru === "мода" && 
      a.status === "published" &&
      !usedArticles.includes(a.id) // Исключаем главную статью сайта
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  // Боковые статьи - могут включать статьи из слайдера
  const sideArticles = articles
    .filter(a => 
      a.category?.ru === "мода" && 
      a.status === "published" &&
      a.id !== mainFashionArticle?.id // Исключаем главную статью блока
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
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