import { useParams } from "react-router-dom";
import articles from "@/data/articles.json";
import { FilteredArticleCard } from "@/shared/components/FilteredArticle/FilteredArticle";

export const AuthorPage = () => {
  const { authorId } = useParams();

  // Фильтруем статьи по author.id
  const filteredArticles = articles
    .filter(
      (article) =>
        article.author?.id === authorId && article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Берём имя автора с первой статьи (или ставим заглушку)
  const authorName =
    filteredArticles[0]?.author?.name?.ru ||
    filteredArticles[0]?.author?.name?.en ||
    authorId;

  return (
    <div>
      <div className="combinate">
        <div className="block"></div>
        <div className="textWrapper">
          <span>Статьи от:</span>
          <span>{authorName.toUpperCase()}</span>
        </div>
        <div className="block"></div>
      </div>
      
      <div className="filterPageWrapper">
        {filteredArticles.length > 0 ? (
          <div className="filteredList">
            {filteredArticles.map((article) => (
              <FilteredArticleCard
                key={article.id}
                article={article}
                lang="ru"
              />
            ))}
          </div>
        ) : (
          <p>Нет статей этого автора.</p>
        )}
      </div>
    </div>
  );
};
