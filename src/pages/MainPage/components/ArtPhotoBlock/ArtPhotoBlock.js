import styles from "./ArtPhotoBlock.module.css";
import PhotoContentButtonCard from "./ArtPhotoCard/PhotoContentButtonCard.js";
import { Link } from "react-router-dom";
import articlesData from "@/data/articles.json";

function ArtPhotoBlock() {
  // Получаем все статьи категории "искусство и фото"
  const artPhotoArticles = articlesData
    .filter(article => article.category?.ru === "искусство и фото" && article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Получаем самую свежую статью среди всех категорий
  const latestOverallArticle = articlesData
    .filter(article => article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  // Выбираем статью для отображения
  const displayArticle = 
    artPhotoArticles[0]?.id === latestOverallArticle?.id
      ? artPhotoArticles[1] // Если самая свежая идет в главный блок, берем следующую
      : artPhotoArticles[0]; // Иначе берем самую свежую

  return (
    <section className={styles.eighthSection}>
      <div className={styles.wrapper}>
        <h3><Link to="/category/art">АРТ & ФОТОГРАФИИ</Link></h3>
        {displayArticle && <PhotoContentButtonCard article={displayArticle} />}
      </div>
    </section>
  );
}

export default ArtPhotoBlock;