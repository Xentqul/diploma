import styles from "./FirstArticleCard.module.css";
import firstMainPic from "@/assets/main-pics/first-main-pic.webp";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";

function FirstArticleCard() {
  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          <Tag variant="unnderline_black" size="big">#мода</Tag>

          <a className={styles.h1} href="#!">
            <h1>
              Показ Dior Cruise 2025 в Тартане и Твиде стал данью уважения
              Шотландии
            </h1>
          </a>

          <p>
            Мария Грация Кьюри отдала дань уважения прошлому и настоящему
            страны.
          </p>
            <AuthorTag href="#!" className={styles.paddingA}>автор: алексис вулф</AuthorTag>
          <LinkButton className={styles.linkButtonMargin}>к коллекции</LinkButton>
        </div>
        <img className={styles.mainPic} src={firstMainPic} alt="main pic" />
      </div>
    </section>
  );
}

export default FirstArticleCard;
