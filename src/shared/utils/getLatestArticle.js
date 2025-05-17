export const getLatestArticle = (articles, category) => {
  return articles
    .filter(
      (article) =>
        article.category?.ru === category && article.status === "published"
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))[0];
};