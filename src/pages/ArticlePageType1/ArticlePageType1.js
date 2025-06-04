import styles from "./ArticlePageType1.module.css";
import ArticleHeader from "@/shared/components/ArticleHeader/ArticleHeader";
import articles from "@/data/articles.json";
import { useParams } from "react-router-dom";

function ArticlePageType1() {
  const { slug } = useParams(); // Получаем слаг из URL
  const article = articles.find(a => a.slug === slug); // Ищем статью по слагу

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className={styles.articleWrapper}>
      <ArticleHeader
        title={article.title} // объект вроде { ru: "Заголовок" }
        description={article.description} // объект вроде { ru: "Описание" }
        tags={article.tags} // массив тегов
        author={article.author} // объект вроде { name: { ru: "Имя" } }
        publishedAt={article.publishedAt} // дата
        image={article.images?.[0]} // Передаем первую картинку
        isFavorite={false}
      />

      {/* Основной контент статьи */}
      <div className={styles.content}>
        {/* Здесь можно выводить дополнительный контент статьи */}
      </div>
    </div>
  );
}

export default ArticlePageType1;