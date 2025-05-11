import React, { createContext, useState, useContext } from "react";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [usedArticles, setUsedArticles] = useState([]);

  // 🔥 Важно: используем `prev`, чтобы избежать проблем с асинхронностью
  const markArticleAsUsed = (articleId) => {
    setUsedArticles((prev) => [...prev, articleId]); // ✅ Корректное обновление
  };

  return (
    <ArticleContext.Provider value={{ usedArticles, markArticleAsUsed }}>
      {children}
    </ArticleContext.Provider>
  );
};
