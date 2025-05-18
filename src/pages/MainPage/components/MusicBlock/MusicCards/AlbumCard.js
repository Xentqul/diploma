import styles from "./AlbumCard.module.css";

import album1 from "@/assets/main-pics/music/main_page-album-1.webp";
import album2 from "@/assets/main-pics/music/main_page-album-2.webp";
import album3 from "@/assets/main-pics/music/main_page-album-3.webp";
import album4 from "@/assets/main-pics/music/main_page-album-4.webp";
import album5 from "@/assets/main-pics/music/main_page-album-5.webp";

// Сопоставляем id альбома с нужной обложкой
const coverMap = {
  1: album1,
  2: album2,
  3: album3,
  4: album4,
  5: album5,
};

function AlbumCard({ data }) {
  // Сортировка по дате релиза
  const sortedData = [...data].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  return (
    <div className={styles.list}>
      {sortedData.map((item) => {
        const cover = coverMap[item.id] || album1; // fallback

        return (
          <div key={item.id} className={styles.item}>
            <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className={styles.albumCoverLink}>
              <img src={cover} alt={item.title} className={styles.albumCover} />
            </a>
            <div className={styles.contentBlock}>
              <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className={styles.albumTitle}>
                {item.title}
              </a>

              {/* Безопасный вывод артиста */}
              {item.artist ? (
                <a href={item.artist.link} className={styles.artistName}>
                  {item.artist.name}
                </a>
              ) : (
                <span className={styles.artistName}>Неизвестный артист</span>
              )}

              <span className={styles.category}>{item.type}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AlbumCard;