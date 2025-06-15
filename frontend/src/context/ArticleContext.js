import React, { createContext, useState, useContext } from "react";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [usedArticles, setUsedArticles] = useState([]);

  // `prev`, чтобы избежать проблем с асинхронностью
  const markArticleAsUsed = (articleId) => {
    setUsedArticles((prev) => [...prev, articleId]);
  };

  return (
    <ArticleContext.Provider value={{ usedArticles, markArticleAsUsed }}>
      {children}
    </ArticleContext.Provider>
  );
};
