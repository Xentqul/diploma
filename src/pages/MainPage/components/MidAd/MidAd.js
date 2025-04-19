import styles from "./MidAd.module.css";

function MidAd() {
  return (
    <div className={styles.adWraper}>
      <div className={styles.container}>
        <span>DRESSERY</span>
        <p>Вам есть что сказать? <a href="#">Станьте нашим модным-журналистом!</a></p>
      </div>
    </div>
  );
}

export default MidAd;
