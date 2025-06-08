import { SimpleHorizontalCard } from "./BeautyCards/SimpleHorizontalCard.js";
import styles from "./BeautyBlock.module.css";
import { Link } from "react-router-dom";
import articlesData from "@/data/articles.json";

function BeautyBlock() {
  // Получаем все статьи категории "красота"
  const beautyArticles = articlesData
    .filter(
      (article) =>
        article.category?.ru === "красота" && article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Получаем самую свежую статью среди всех категорий
  const latestOverallArticle = articlesData
    .filter((article) => article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  // Если самая свежая статья категории "красота" является самой свежей среди всех,
  // исключаем ее из отображения
  const displayArticles =
    beautyArticles[0]?.id === latestOverallArticle?.id
      ? beautyArticles.slice(1, 5) // Пропускаем первую, берем следующие 4
      : beautyArticles.slice(0, 4); // Берем первые 4

  return (
    <section className={styles.sixthSection}>
      <h2>
        <Link to="/category/beauty" className={styles.title}>
          КРАСОТА
        </Link>
      </h2>
      <SimpleHorizontalCard articles={displayArticles} />
      <Link to="/category/beauty" className={styles.linkToMore}>
        <span className={styles.seeAll}>СМОТРЕТЬ ВСЕ›</span>
      </Link>
    </section>
  );
}

export default BeautyBlock;
