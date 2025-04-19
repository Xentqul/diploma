import styles from "./MusicBlock.module.css";
import { MusicCardsData } from "./MusicCards/MusicCardsData.js";
import { AllContentCard } from "../FashionBlock/FashionCards/AllContentCard.js";
import { AlbumCardsData } from "./MusicCards/AlbumCardsData.js";
import AlbumCard from "./MusicCards/AlbumCard.js"

function MusicBlock() {
  return (
    <div className={styles.seventhSection}>
      <h2>МУЗЫКА</h2>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
            <AllContentCard data={MusicCardsData} variant="vertical" />
        </div>
        <div className={styles.rightSide}>
          <span className={styles.titleOfAlbumsBlock}>ПОСЛЕДНИЕ РЕЛИЗЫ</span>
          <AlbumCard data={AlbumCardsData}/>
        </div>
      </div>
    </div>
  );
}

export default MusicBlock;
