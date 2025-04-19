import styles from "./FashionBlock.module.css";
import { MainCenterArticle } from "./FashionCards/MainCenterArticle.js";
import { AllContentCard } from "./FashionCards/AllContentCard.js";
import { FashionCardsData } from "./FashionCards/FashionCardsData";

function FashionBlock() {
  return (
    <section className={styles.fourthSection}>
      <div className={styles.wrapper}>
        <h2>МОДА</h2>
        <div className={styles.container}>
          <MainCenterArticle />
          <div className={styles.containerAside}>
            <AllContentCard data={FashionCardsData} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FashionBlock;
