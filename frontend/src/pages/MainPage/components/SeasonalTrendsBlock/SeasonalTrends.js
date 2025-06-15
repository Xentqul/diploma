import styles from './SeasonalTrends.module.css';
import SeasonalCard from './SeasonalCard/SeasonalCard';
import articles from '@/data/articles.json';

function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

export default function SeasonalTrends() {
  const currentLang = 'ru'; // можно расширить до хука для мультиязычности
  const currentSeason = getCurrentSeason();

  const seasonalArticles = articles
    .filter(
      a =>
        a.status === 'published' &&
        a.isSeasonalTrend &&
        (a.season === currentSeason || a.season === 'all')
    )
    .slice(0, 4); // только 4 статьи

  return (
    <section className={styles.thirdSection}>
      <div className={styles.wrapper}>
        <h2>ТРЕНДЫ СЕЗОНА</h2>
        <div className={styles.container}>
          {seasonalArticles.map(article => (
            <SeasonalCard key={article.id} card={article} lang={currentLang} />
          ))}
        </div>
      </div>
    </section>
  );
}