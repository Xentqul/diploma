import styles from "./FirstArticleCard.module.css";
import firstMainPic from "../../assets/main_pics/first-main-pic.webp";

function FirstArticleCard() {
  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          <span>
            <a href="#">#мода</a>
          </span>

          <a href="#!">
            <h1>
              Показ Dior Cruise 2025 в Тартане и Твиде стал данью уважения
              Шотландии
            </h1>
          </a>

          <p>
            Мария Грация Кьюри отдала дань уважения прошлому и настоящему
            страны.
          </p>
          <a href="#!">
            <span>автор: алексис вулф</span>
          </a>
          <a href="#">К коллекции</a>
        </div>
        <img className={styles.mainPic} src={firstMainPic} alt="main pic" />
      </div>
    </section>
  );
}

export default FirstArticleCard;
