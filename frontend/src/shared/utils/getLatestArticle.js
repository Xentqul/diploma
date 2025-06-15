export const getLatestArticle = (articles, category) => {
  const filtered = articles.filter(
    (article) =>
      article.category?.ru === category && article.status === "published"
  );

  if (filtered.length === 0) return null;

  const sorted = filtered.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );

  return sorted[0];
};