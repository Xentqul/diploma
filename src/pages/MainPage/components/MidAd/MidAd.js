import styles from "./MidAd.module.css";
import { Link } from "react-router-dom";

function MidAd() {
  return (
    <div className={styles.adWraper}>
      <div className={styles.container}>
        <span>DRESSERY</span>
        <p>Вам есть что сказать? <Link to="/application">Станьте нашим модным-журналистом!</Link></p>
      </div>
    </div>
  );
}

export default MidAd;
