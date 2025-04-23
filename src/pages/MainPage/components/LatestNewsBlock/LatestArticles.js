import styles from "./LatestArticles.module.css";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { Tag } from "@/shared/ui/Tag/Tag";
import slide1 from "@/assets/main-pics/main-slider/slide-1.webp";
import slide2 from "@/assets/main-pics/main-slider/slide-2.webp";
import slide3 from "@/assets/main-pics/main-slider/slide-3.webp";
import slide4 from "@/assets/main-pics/main-slider/slide-4.webp";

const articles = [
  {
    id: 1,
    bgImage: slide1,
    tag: "#мода",
    title: "Показ CHANEL Весна-Лето 2025",
    description:
      "Цветы, золото и струящиеся ткани: как легкость воплощается в жизнь с новой коллекцией",
    author: "автор: павел нестеров",
    authorId: "pavel_nesterov",
    link: "#",
  },
  {
    id: 2,
    bgImage: slide2,
    tag: "#мода",
    title: "Кьюри наконец сделала это",
    description: "Мария Кьюри возвращается с триумфальной осенью-зимой 2025.",
    author: "автор: мария говорунова",
    authorId: "maria_govorunova",
    link: "#",
  },
  {
    id: 3,
    bgImage: slide3,
    tag: "#дизайнер",
    title: "Из Balenciaga в Gucci",
    description:
      "Крупные перестановки в мире моды продалжаются и в этот раз настигли Gucci в лице Демны Гвасалии",
    author: "автор: павел нестеров",
    authorId: "pavel_nesterov",
    link: "#",
  },
  {
    id: 4,
    bgImage: slide4,
    tag: "#дизайнер",
    title: "Донателла Версаче покидает VERSACE",
    description:
      "Уход Донателлы знаменует дому новый творческий этап под руководством Дарио Виталле",
    author: "автор: мария говорунова",
    authorId: "maria_govorunova",
    link: "#",
  },
];

function LatestArticles() {
  return (
<div className={styles.articlesContainer}>
          {articles.map((article) => (
            <div key={article.id} className={styles.article}>
              {/* Фото */}
              <img
                src={article.bgImage}
                alt={article.title}
                className={styles.articleImage}
              />
              {/* Текстовый блок */}
              <div className={styles.textBlock}>
                <Tag>{article.tag}</Tag>
                <a href={article.link} className={styles.titleLink}>
                  <h3 className={styles.title}>{article.title}</h3>
                </a>
                <p className={styles.description}>{article.description}</p>
                <div className={styles.authorAndButton}>
                  <AuthorTag size="s" color="black">{article.author}</AuthorTag>
                </div>
              </div>
            </div>
          ))}
        </div>
  );
}

export default LatestArticles;
