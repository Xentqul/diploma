import styles from './LatestNewsBlock.module.css'
import MainSlider from '@/widgets/MainSlider/MainSlider';
import LatestArticles from './LatestArticles.js';

function LatestNewsBlock() {
    return ( 
        <section className={styles.secondSection}>
        <div className={styles.wrapper}>
        <h2 className={styles.heading}>ПОСЛЕДНИЕ НОВОСТИ</h2>
        <MainSlider />
        <LatestArticles />
        </div>
        </section>
     );
}

export default LatestNewsBlock;