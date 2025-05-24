import { useParams } from "react-router-dom";
import articles from "@/data/articles.json";
import { FilteredArticleCard } from "@/shared/components/FilteredArticle/FilteredArticle";

export const TagPage = () => {
  const { tagId } = useParams();

  // Фильтруем статьи по наличию тега с id = tagId
  const filteredArticles = articles
    .filter(
      (article) =>
        article.tags.some((tag) => tag.id === tagId) &&
        article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  // Находим первый подходящий тег с переводом
  const tagVisibleRu =
    filteredArticles[0]?.tags.find((tag) => tag.id === tagId)?.visible?.ru ||
    `#${tagId}`; // fallback

  return (
    <div>
      <div className="combinate">
        <div className="block"></div>
        <div className="textWrapper">
          <span>Статьи категории:</span>
          <span>{tagVisibleRu.toUpperCase()}</span>
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
          <p>Нет статей с этим тегом.</p>
        )}
      </div>
    </div>
  );
};
