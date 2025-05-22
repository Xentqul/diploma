import { useParams } from "react-router-dom";
import articles from "@/data/articles.json";
import { FilteredArticleCard } from "@/shared/components/FilteredArticle/FilteredArticle";

export const AuthorPage = () => {
  const { authorId } = useParams();

  // Фильтруем статьи по author.id
  const filteredArticles = articles
    .filter((article) => article.author?.id === authorId && article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <div className="author-page">
      <h1>Статьи от: {authorId}</h1>

      {filteredArticles.length > 0 ? (
        <div className="filteredList">
          {filteredArticles.map((article) => (
            <FilteredArticleCard key={article.id} article={article} lang="ru" />
          ))}
        </div>
      ) : (
        <p>Нет статей этого автора.</p>
      )}
    </div>
  );
};