import styles from './SeasonalTrends.module.css';
import SeasonalCard from './SeasonalCard/SeasonalCard.js';
import { cardsData } from '@/pages/MainPage/components/SeasonalTrendsBlock/SeasonalCard/CardsData';

export default function SeasonalTrends() {
  return (
    <section className={styles.thirdSection}>
      <div className={styles.wrapper}>
        <h2>ТРЕНДЫ СЕЗОНА</h2>
        <div className={styles.container}>
          {cardsData.map(card => (
            <SeasonalCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
