import "./App.css";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import Header from "./shared/layout/Header/Header";
import Footer from "./shared/layout/Footer/Footer";
import MainPage from "./pages/MainPage/MainPage.js";
import LoginPage from "./pages/LogInPage/LogInPage.js";

function App() {
  return (
    <div className="App">
      <Header />

      {/* Основной контент */}
      <div className="content">
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<MainPage />} />
          {/* Страница входа */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;