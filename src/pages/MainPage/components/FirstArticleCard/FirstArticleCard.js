import { useContext, useEffect } from "react";
import styles from "./FirstArticleCard.module.css";
import { LinkButton } from "@/shared/ui/LinkButton/LinkButton";
import { Tag } from "@/shared/ui/Tag/Tag";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import articles from "@/data/articles.json";
import firstMainPic from "@/assets/main-pics/first-main-pic.webp";
import { ArticleContext } from "@/context/ArticleContext";

function FirstArticleCard() {
  const currentLang = "ru";
  const { usedArticles, markArticleAsUsed } = useContext(ArticleContext);

  // 1. Находим самую свежую статью категории "мода"
  const mainArticle = articles
    .filter(
      (article) =>
        article.category?.ru === "мода" && article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];

  // 2. Помечаем статью как использованную
  useEffect(() => {
    if (mainArticle?.id && !usedArticles.includes(mainArticle.id)) {
      markArticleAsUsed(mainArticle.id);
      console.log("Главная статья помечена:", mainArticle.id, mainArticle.title.ru);
    }
  }, [mainArticle, usedArticles, markArticleAsUsed]);

  if (!mainArticle) return <p>Статья не найдена</p>;

  const authorName = mainArticle.author.name[currentLang] || mainArticle.author.id;

  return (
    <section className={styles.firstSection}>
      <div className={styles.wrapper}>
        <div className={styles.textBlock}>
          {/* Используем id для тега */}
          {mainArticle.tags.length > 0 && (
            <Tag size="big" id={mainArticle.tags[0].id}>
              {mainArticle.tags[0].visible[currentLang]}
            </Tag>
          )}

          {/* Ссылка на статью */}
          <a className={styles.h1} href={mainArticle.link}>
            <h1>{mainArticle.title[currentLang]}</h1>
          </a>

          {/* Описание статьи */}
          <p>{mainArticle.description[currentLang]}</p>

          {/* Используем id для автора */}
          {mainArticle.author && (
            <AuthorTag id={mainArticle.author.id} color="black">
              автор: {authorName}
            </AuthorTag>
          )}

          <LinkButton className={styles.linkButtonMargin} to={mainArticle.link}>
            к коллекции
          </LinkButton>
        </div>

        <img
          className={styles.mainPic}
          src={firstMainPic}
          alt={mainArticle.title[currentLang]}
        />
      </div>
    </section>
  );
}

export default FirstArticleCard;