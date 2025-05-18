import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./shared/layout/Header/Header";
import Footer from "./shared/layout/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage.js";
import LoginPage from "./pages/LogInPage/LogInPage.js";
import SignUpPage from "./pages/SignUpPage/SignUpPage.js";
import ApplicationPage from "./pages/ApplicationPage/ApplicationPage.js";
import AccountPage from "./pages/AccountPage/AccountPage.js";
import axios from "axios";
import { ArticleProvider } from "@/context/ArticleContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CookieBanner } from "./shared/components/CookieBanner/CookieBanner";

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
            </Routes>{" "}
          </ArticleProvider>
        </div>

        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
