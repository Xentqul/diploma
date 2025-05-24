import { useContext, useEffect } from "react";
import styles from "./FirstArticleCard.module.css";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import { ArticleContext } from "@/context/ArticleContext";
import { getLatestArticle } from "@/shared/utils/getLatestArticle.js";
import articles from "@/data/articles.json";

function FirstArticleCard() {
  const currentLang = "ru";
  const { usedArticles, markArticleAsUsed } = useContext(ArticleContext);

  // Находим самую свежую статью категории "мода"
  const mainArticle = getLatestArticle(articles, "мода");

  // Помечаем как использованную
  useEffect(() => {
    if (mainArticle?.id && !usedArticles.includes(mainArticle.id)) {
      markArticleAsUsed(mainArticle.id);
      console.log("Главная статья помечена:", mainArticle.id, mainArticle.title.ru);
    }
  }, [mainArticle, usedArticles, markArticleAsUsed]);

  if (!mainArticle) return <p>Статья не найдена</p>;

  const authorName = mainArticle.author.name[currentLang] || mainArticle.author.id;
  const firstTag = mainArticle.tags?.[0]?.visible?.[currentLang] || "#мода";

  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          {/* Тег */}
          <Tag size="big" id={mainArticle.tags[0]?.id}>
            {firstTag}
          </Tag>

          {/* Заголовок */}
          <a className={styles.h1} href={mainArticle.link}>
            <h1>{mainArticle.title[currentLang]}</h1>
          </a>

          {/* Описание */}
          <p>{mainArticle.description[currentLang]}</p>

          {/* Автор */}
          {mainArticle.author && (
            <AuthorTag id={mainArticle.author.id} color="black">
              автор: {authorName}
            </AuthorTag>
          )}

          {/* Кнопка */}
          <LinkButton className={styles.linkButtonMargin} to={mainArticle.link}>
            к коллекции
          </LinkButton>
        </div>

        {/* Изображение */}
        {mainArticle.images?.[0] && (
          <img
            className={styles.mainPic}
            src={mainArticle.images[0]}
            alt={mainArticle.title[currentLang]}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
      </div>
    </section>
  );
}

export default FirstArticleCard;