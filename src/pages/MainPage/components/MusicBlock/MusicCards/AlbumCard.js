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
          <Link to={item.externalLink} target="_blank" rel="noopener noreferrer" className={styles.albumCoverLink}>
            {item.cover && (
              <img
                src={item.cover}
                alt={item.title || "Обложка альбома"}
                className={styles.albumCover}
              />
            )}
          </Link>

          <div className={styles.contentBlock}>
            {/* Название альбома */}
            <Link to={item.externalLink} target="_blank" rel="noopener noreferrer" className={styles.albumTitle}>
              {item.title}
            </Link>

            {/* Артист */}
            {item.artist ? (
              <Link to={item.artist.link} className={styles.artistName}>
                {item.artist.name}
              </Link>
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