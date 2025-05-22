import { useParams } from "react-router-dom";
import articles from "@/data/articles.json";
import { FilteredArticleCard } from "@/shared/components/FilteredArticle/FilteredArticle";

export const TagPage = () => {
  const { tagId } = useParams();

  // Фильтруем статьи по наличию тега с id = tagId
  const filteredArticles = articles
    .filter(
      (article) =>
        article.tags.some(tag => tag.id === tagId) &&
        article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <div className="tag-page">
      <h1>Статьи по тегу: {tagId}</h1>

      {filteredArticles.length > 0 ? (
        <div className="filteredList">
          {filteredArticles.map((article) => (
            <FilteredArticleCard key={article.id} article={article} lang="ru" />
          ))}
        </div>
      ) : (
        <p>Нет статей с этим тегом.</p>
      )}
    </div>
  );
};