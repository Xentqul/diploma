import "./App.css";
import Header from "./shared/layout/Header/Header";
import Footer from "./shared/layout/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage.js";
import LoginPage from "./pages/LogInPage/LogInPage.js";
import SignUpPage from "./pages/SignUpPage/SignUpPage.js";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage.js";
import AccountPage from "./pages/AccountPage/AccountPage.js";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/hooks/useScrollToTop.js";
import { ArticleProvider } from "@/context/ArticleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CookieBanner } from "./shared/components/CookieBanner/CookieBanner";
import { CategoryPage } from "./pages/CategoryPage/CategoryPage.js";
import { AuthorPage } from "./pages/AuthorPage/AuthorPage.js";
import { TagPage } from "./pages/TagPage/TagPage.js";

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Header />

        {/* Баннер с куки */}
        <CookieBanner />

        {/* Основной контент */}
        <div className="content">
          <ArticleProvider>
            <ScrollToTop />
            <Routes>
              {/* Главная страница */}
              <Route path="/" element={<MainPage />} />
              {/* Страница входа */}
              <Route path="/login" element={<LoginPage />} />
              {/* Страница регистрации */}
              <Route path="/signup" element={<SignUpPage />} />
              {/* Страница подачи заявки на работу */}
              <Route path="/application" element={<ApplicationPage />} />
              {/* Страница аккаунта */}
              <Route path="/account" element={<AccountPage />} />
              {/* СТРАНИЦЫ ФИЛЬТРАЦИИ */}
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/author/:authorId" element={<AuthorPage />} />
              <Route path="/tag/:tagId" element={<TagPage />} />
            </Routes>
          </ArticleProvider>
        </div>

        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
