import styles from "./MusicBlock.module.css";
import { AllContentCardVertical } from "./MusicCards/AllContentCardVertical"; 
import AlbumCard from "./MusicCards/AlbumCard";
import articlesData from "@/data/articles.json";
import musicData from "@/data/music.json";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ArticleContext } from "@/context/ArticleContext";

function MusicBlock() {
  const { usedArticles } = useContext(ArticleContext);

  // Получаем статьи категории "музыка"
  const musicArticles = articlesData
    .filter(
      (article) =>
        article.category?.ru === "музыка" &&
        article.status === "published" &&
        !usedArticles.includes(article.id)
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 2); // Берём 2 самые свежие статьи

  return (
    <div className={styles.seventhSection}>
      <h2>
        <Link to="/category/music" className={styles.title}>
          МУЗЫКА
        </Link>
      </h2>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          {/* Теперь карточки используют images из данных */}
          <AllContentCardVertical data={musicArticles} />
        </div>

        <div className={styles.rightSide}>
          <span className={styles.titleOfAlbumsBlock}>ПОСЛЕДНИЕ РЕЛИЗЫ</span>
          <AlbumCard data={musicData} />
        </div>
      </div>
    </div>
  );
}

export default MusicBlock;