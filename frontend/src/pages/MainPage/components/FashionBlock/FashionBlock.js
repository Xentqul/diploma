import styles from "./FashionBlock.module.css";
import { MainCenterArticle } from "./FashionCards/MainCenterArticle";
import { AllContentCard } from "./FashionCards/AllContentCard";
import { useContext } from "react";
import { Link } from "react-router-dom";
import articles from "@/data/articles.json";
import { ArticleContext } from "@/context/ArticleContext";

function FashionBlock() {
  const { usedArticles } = useContext(ArticleContext);

  // Получаем ID главной статьи (из первого блока)
  const mainArticleId = articles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0]?.id;

  // Получаем ID всех статей из слайдера (первые 5 опубликованных)
  const sliderArticleIds = articles
    .filter((a) => a.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5)
    .map((article) => article.id);

  // Боковые статьи - исключаем:
  // 1. Уже использованные (usedArticles)
  // 2. Статьи из слайдера
  // 3. Сезонные тренды (isSeasonalTrend: true)
  const sideArticles = articles
    .filter(
      (article) =>
        article.category?.ru === "мода" &&
        article.status === "published" &&
        !usedArticles.includes(article.id) &&
        !sliderArticleIds.includes(article.id) &&
        !article.isSeasonalTrend // Исключаем сезонные тренды
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 3);

  // Главная статья блока моды
  const mainFashionArticle = articles
    .filter(
      (article) =>
        article.category?.ru === "мода" &&
        article.status === "published" &&
        !usedArticles.includes(article.id) &&
        article.id !== mainArticleId
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  return (
    <section className={styles.fourthSection}>
      <div className={styles.wrapper}>
        <h2>
          <Link to="/category/fashion" className={styles.title}>МОДА</Link>
        </h2>
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
