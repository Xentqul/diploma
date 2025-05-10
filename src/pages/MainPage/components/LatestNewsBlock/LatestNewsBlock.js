// LatestNewsBlock.jsx
import React, { useContext } from "react";
import styles from './LatestNewsBlock.module.css';
import MainSlider from '@/widgets/MainSlider/MainSlider';
import articles from "@/data/articles.json";
import { ArticleContext } from "@/context/ArticleContext";
import { getFilteredArticles } from "@/shared/utils/getFilteredArticles";

function LatestNewsBlock() {
  const { usedArticles } = useContext(ArticleContext);

  // Получаем 4 последние статьи, исключая использованные
  const filteredArticles = getFilteredArticles(articles, usedArticles, 4);

  return ( 
    <section className={styles.secondSection}>
      <div className={styles.wrapper}>
        <h2 className={styles.heading}>ПОСЛЕДНИЕ НОВОСТИ</h2>
        <MainSlider articles={filteredArticles} />
      </div>
    </section>
  );
}

export default LatestNewsBlock;