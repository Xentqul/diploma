import styles from "./AlbumCard.module.css";
import { Link } from "react-router-dom";

function AlbumCard({ data }) {
  // Сортировка по дате релиза
  const sortedData = [...data].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  return (
    <div className={styles.list}>
      {sortedData.map((item) => (
        <div key={item.id} className={styles.item}>
          {/* Обложка альбома */}
          <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className={styles.albumCoverLink}>
            {item.cover && (
              <img
                src={item.cover}
                alt={item.title || "Обложка альбома"}
                className={styles.albumCover}
              />
            )}
          </a>

          <div className={styles.contentBlock}>
            {/* Название альбома */}
            <a href={item.externalLink} target="_blank" rel="noopener noreferrer" className={styles.albumTitle}>
              {item.title}
            </a>

            {/* Артист */}
            {item.artist ? (
              <a href={item.artist.link} className={styles.artistName}>
                {item.artist.name}
              </a>
            ) : (
              <span className={styles.artistName}>Неизвестный артист</span>
            )}

            {/* Тип (альбом / сингл) */}
            <span className={styles.category}>{item.type}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlbumCard;