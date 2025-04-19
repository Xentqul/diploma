import { SimpleHorizontalCard } from "./BeautyCards/SimpleHorizontalCard.js";
import styles from "./BeautyBlock.module.css";

function BeautyBlock() {
  return (
    <section className={styles.sixthSection}>
      <h2>КРАСОТА</h2>
      <SimpleHorizontalCard />
      <a href="!#" className={styles.linkToMore}>
        <span>СМОТРЕТЬ ВСЕ›</span>
      </a>
    </section>
  );
}

export default BeautyBlock;
