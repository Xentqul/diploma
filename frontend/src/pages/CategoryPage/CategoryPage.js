import { useParams } from "react-router-dom";
import articles from "@/data/articles.json";
import { FilteredArticleCard } from "@/shared/components/FilteredArticle/FilteredArticle";

export const CategoryPage = () => {
  const { categoryId } = useParams();

  // Словарь категорий
  const categoryNames = {
    fashion: "мода",
    music: "музыка",
    beauty: "красота",
    art: "искусство и фото",
    culture: "культура",
  };

  const categoryName = categoryNames[categoryId] || categoryId;

  // Фильтрация статей по категории
  const filteredArticles = articles
    .filter(
      (article) =>
        article.category?.ru === categoryName && article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <div>
      <div className="combinate">
        <div className="block"></div>
        <div className="textWrapper">
          <span>Статьи категории:</span>
          <span>{categoryName.toUpperCase()}</span>
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
          <p>Нет статей в этой категории.</p>
        )}
      </div>
    </div>
  );
};
