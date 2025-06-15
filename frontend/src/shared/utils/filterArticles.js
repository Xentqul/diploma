// utils/articleFilter.js
export const filterArticles = (articles, usedArticles, category) => {
    // Фильтруем статьи по категории и исключаем использованные
    const filteredArticles = articles
      .filter(article => article.category.ru === category && !usedArticles.includes(article.id))
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)) // Сортируем по дате публикации (новые выше)
      .slice(0, 3); // Берем первые три
  
    return filteredArticles;
  };