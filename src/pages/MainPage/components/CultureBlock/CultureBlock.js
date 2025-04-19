import styles from "./CultureBlock.module.css";
import { CultureCardsData } from "./CultureCards/CultureCardsData";
import { MainBiggerArticle } from "./CultureCards/MainBiggerArticle";
import { HorizontalWideArticle } from "./CultureCards/HorizontalWideArticle";

function CultureBlock() {
  const featuredArticle = CultureCardsData.find(item => item.isFeatured);
  const asideArticles = CultureCardsData.filter(item => !item.isFeatured);

  return (  
    <section className={styles.fifthSection}>
      <div className={styles.wrapper}>
        <h2>КУЛЬТУРА</h2>

        <div className={styles.container}>
          <div className={styles.leftColumn}>
            <HorizontalWideArticle articles={asideArticles.slice(0, 2)} />
          </div>
          
          <div className={styles.centerColumn}>
            <MainBiggerArticle article={featuredArticle} />
          </div>
          
          <div className={styles.rightColumn}>
            <HorizontalWideArticle articles={asideArticles.slice(2)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CultureBlock;