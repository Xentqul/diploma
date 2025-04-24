import styles from "./AlbumCard.module.css";

function AlbumCard({ data }) {
  return (
    <div className={styles.list}>
      {data.map((item) => (
        <div key={item.id} className={styles.item}>
          <a href={item.albumLink} className={styles.albumCoverLink}>
            <img
              src={item.albumCover}
              alt={item.albumTitle}
              className={styles.albumCover}
            />
          </a>
          <div className={styles.contentBlock}>
            <a href={item.albumLink} className={styles.albumTitle}>
              {item.albumTitle}
            </a>

            <a href={item.artistLink} className={styles.artistName}>
              {item.artistName}
            </a>

            <span className={styles.category}>{item.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlbumCard;
