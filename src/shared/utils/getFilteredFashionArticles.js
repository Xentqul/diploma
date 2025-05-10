export const getFilteredFashionArticles = (articles, usedArticles, limit = 3) => {
    return articles
      .filter(
        (article) =>
          article.category?.ru === "мода" &&
          article.status === "published" &&
          !usedArticles.includes(article.id)
      )
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  };