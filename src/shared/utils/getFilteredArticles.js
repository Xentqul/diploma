// src/shared/utils/getFilteredArticles.js
export const getFilteredArticles = (articles, usedArticles, limit = 4) => {
    return articles
      .filter(article => article.status === 'published' && !usedArticles.includes(article.id))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, limit);
  };