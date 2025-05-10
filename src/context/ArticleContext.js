import React, { createContext, useState, useContext } from "react";

export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [usedArticles, setUsedArticles] = useState([]);

  const markArticleAsUsed = (articleId) => {
    setUsedArticles((prev) => [...new Set([...prev, articleId])]);
  };

  return (
    <ArticleContext.Provider value={{ usedArticles, markArticleAsUsed }}>
      {children}
    </ArticleContext.Provider>
  );
};