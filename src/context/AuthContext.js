import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка авторизации при загрузке
  const checkAuth = async () => {
    try {
      const res = await axios.get("https://diploma-od66.onrender.com/api/auth/check",  {
        withCredentials: true,
      });
      setIsAuthenticated(res.data.isAuthenticated);
    } catch (err) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchAuthStatus = async () => {
      try {
        const res = await axios.get("https://diploma-od66.onrender.com/api/auth/check",  {
          withCredentials: true,
          signal,
        });
        setIsAuthenticated(res.data.isAuthenticated);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();

    return () => {
      controller.abort(); // Отмена запроса при размонтировании
    };
  }, []);

  // Функция входа
  const login = async (email, password) => {
    try {
      await axios.post(
        "https://diploma-od66.onrender.com/api/auth/login", 
        { email, password },
        {
          withCredentials: true,
        }
      );
      setIsAuthenticated(true);
    } catch (err) {
      throw err;
    }
  };

  // Функция выхода
  const logout = async () => {
    try {
      await axios.post(
        "https://diploma-od66.onrender.com/api/auth/logout", 
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("Ошибка выхода");
    }

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, checkAuth }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);