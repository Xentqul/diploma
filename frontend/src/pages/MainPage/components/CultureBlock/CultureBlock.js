import styles from "./CultureBlock.module.css";
import articlesData from "@/data/articles.json";
import { MainBiggerArticle } from "./CultureCards/MainBiggerArticle";
import { HorizontalWideArticle } from "./CultureCards/HorizontalWideArticle";
import { Link } from "react-router-dom";

function CultureBlock() {
  // Если articlesData не загрузился, используем пустой массив
  const articles = articlesData || [];
  
  // Фильтруем и сортируем статьи
  const cultureArticles = articles
    .filter(article => 
      article.category?.ru?.toLowerCase() === "культура" && 
      article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  
  // Главная статья - самая свежая
  const featuredArticle = cultureArticles[0];
  
  // Боковые статьи - следующие 4 по свежести (2 слева, 2 справа)
  const asideArticles = cultureArticles.slice(1, 5);

  return (  
    <section className={styles.fifthSection}>
      <div className={styles.wrapper}>
        <h2><Link to="/category/culture" className={styles.title}>КУЛЬТУРА</Link></h2>

        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <HorizontalWideArticle articles={asideArticles.slice(0, 2)} />
          </div>
          
          <div className={styles.centerColumn}>
            {featuredArticle && <MainBiggerArticle article={featuredArticle} />}
          </div>
          
          <div className={styles.rightColumn}>
            <HorizontalWideArticle articles={asideArticles.slice(2)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CultureBlock;