// AdBlock.jsx
import styles from "./AdBlock.module.css";

const AdBlock = ({ image, text, link, isImageLeft }) => {
  return (
    <div>
      <hr className={styles.hr} />
      <div className={styles.adBlock}>
        {isImageLeft ? (
          <div className={styles.flexBlock}>
            <img src={image} alt="Реклама" className={styles.image} />
            <div className={styles.text}>
              <p>{text}</p>
              <button className={styles.adButton} href={link.url}>
                {link.ru}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.text}>
              <p>{text}</p>
              <button className={styles.adButton} href={link.url}>
                {link.ru}
              </button>
            </div>
            <img src={image} alt="Реклама" className={styles.image} />
          </>
        )}
      </div>
      <hr className={styles.hr} />
    </div>
  );
};

export default AdBlock;
