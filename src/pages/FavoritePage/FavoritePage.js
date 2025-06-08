import { useEffect, useState } from "react";
import articles from "@/data/articles.json";
import { FilteredArticleCard } from "@/shared/components/FilteredArticle/FilteredArticle";

export const FavoritePage = () => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  // Получаем ID избранных статей из localStorage
  const getFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  };

  useEffect(() => {
    const favoriteIds = getFavoritesFromLocalStorage();

    // Фильтруем статьи по ID из избранного
    const filtered = articles.filter((article) =>
      favoriteIds.includes(article.id)
    );

    setFavoriteArticles(filtered);
  }, []);

  return (
    <div>
      <div className="combinate">
        <div className="block"></div>
        <div className="textWrapper">
          <span>Избранное</span>
          <span>{favoriteArticles.length} статей</span>
        </div>
        <div className="block"></div>
      </div>

      <div className="filterPageWrapper">
        {favoriteArticles.length > 0 ? (
          <div className="filteredList">
            {favoriteArticles.map((article) => (
              <FilteredArticleCard
                key={article.id}
                article={article}
                lang="ru"
              />
            ))}
          </div>
        ) : (
          <p>Нет статей в избранном.</p>
        )}
      </div>
    </div>
  );
};