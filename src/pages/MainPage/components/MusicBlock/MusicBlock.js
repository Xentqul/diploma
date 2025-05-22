import styles from "./MusicBlock.module.css";
import { AllContentCardVertical } from "./MusicCards/AllContentCardVertical"; 
import AlbumCard from "./MusicCards/AlbumCard";
import articlesData from "@/data/articles.json";
import musicData from "@/data/music.json";
import { Link } from "react-router-dom";

// Импортируем ТОЛЬКО музыкальные картинки
import music1 from "@/assets/main-pics/music/music-article-1.webp";
import music2 from "@/assets/main-pics/music/music-article-2.webp";

function MusicBlock() {
  // Получаем статьи категории "музыка"
  const musicArticles = articlesData
    .filter(article => article.category?.ru === "музыка" && article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Получаем самую свежую статью среди всех категорий
  const latestOverallArticle = articlesData
    .filter(article => article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  // Фильтруем статьи
  const filteredMusicArticles = musicArticles.filter(article => 
    article.id !== latestOverallArticle?.id
  ).slice(0, 2); // Берем 2 статьи

  // Подготавливаем данные с ПРАВИЛЬНЫМИ картинками
  const musicArticlesWithImages = filteredMusicArticles.map((article, index) => ({
    ...article,
    image: index === 0 ? music1 : music2
  }));

  return (
    <div className={styles.seventhSection}>
      <h2><Link to="/category/music" className={styles.title}>МУЗЫКА</Link></h2>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          <AllContentCardVertical data={musicArticlesWithImages} />
        </div>
        <div className={styles.rightSide}>
          <span className={styles.titleOfAlbumsBlock}>ПОСЛЕДНИЕ РЕЛИЗЫ</span>
          {/* данные из JSON */} 
          <AlbumCard data={musicData} />
        </div>
      </div>
    </div>
  );
}

export default MusicBlock;