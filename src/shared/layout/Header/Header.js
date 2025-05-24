import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function Header() {
  const { isAuthenticated, logout } = useAuth(); // Получение статуса авторизации
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Применить тему при первом рендере
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkTheme ? "dark" : "light"
    );
  }, [isDarkTheme]);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
  };

  // Логика скрытия нижней части шапки при скролле
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingDown(prevScrollPos < currentScrollPos && currentScrollPos > 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={styles.header}>
      {/* Мобильная версия */}
      <div className={styles.accountButtonMobile}>
        <Link to={isAuthenticated ? "/account" : "/login"}>
          <img
            src={isAuthenticated ? "/assets/icons/account-icon-checked.png" : "/assets/icons/account-icon.png"}
            alt="account"
            className={`${styles.accountImgMobile} ${isDarkTheme ? "ColorInversion" : ""}`}
          />
        </Link>
      </div>

      <div className={styles.logoMobileWrapper}>
        <Link to={"/"}>
          <span className={styles.logoMobile}>DR</span>
        </Link>
      </div>

      <div
        className={`${styles.burgerButton} ${isBurgerMenuOpen ? styles.open : ""}`}
        onClick={() => setIsBurgerMenuOpen((prev) => !prev)}
      >
        <img
          src="/assets/icons/burger_menu-mobile.png"
          alt="меню"
          className={`${styles.burgerMenuIcon} ${isDarkTheme ? "ColorInversion" : ""}`}
        />
      </div>

      {/* Верхняя часть шапки / Десктоп */}
      <div className={styles.upperHeader}>
        <div className={styles.wrapper}>
          <div className={styles.logoLanguage}>
            <Link to="/">
              <span className={styles.logo}>DRESSERY</span>
            </Link>
            <hr className={styles.verticalHr} />
            <img
              src="/assets/icons/change-lang-icon.png"
              alt="change language"
              className={`${styles.changeLanguage} ${isDarkTheme ? "ColorInversion" : ""}`}
            />
          </div>

          {/* Соцсети */}
          <div className={styles.socialAccount}>
            <ul className={styles.socialMedia}>
              <li>
                <a href="#">
                  <img src="/assets/icons/inst-icon.png" alt="instagram" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/icons/telegram-icon.png" alt="telegram" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/icons/classmates-icon.png" alt="одноклассники" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/icons/twitter-icon.png" alt="twitter" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/icons/vk-icon.png" alt="vk" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/assets/icons/tiktok-icon.png" alt="tiktok" className="imgColorInvert" />
                </a>
              </li>
            </ul>
            <hr className={styles.verticalHr} />

            {!isAuthenticated && (
              <Link to="/login" className={styles.accountButton}>
                Войти
              </Link>
            )}
            <Link to={isAuthenticated ? "/account" : "/login"}>
              <img
                src={isAuthenticated ? "/assets/icons/account-icon-checked.png" : "/assets/icons/account-icon.png"}
                alt="account"
                className={`${styles.accountImg} ${isDarkTheme ? "ColorInversion" : ""}`}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Навигация по категориям / Десктоп */}
      <div
        className={`${styles.lowerHeaderBlock} ${
          isScrollingDown ? styles.hidden : ""
        }`}
      >
        <div className={styles.wrapper}>
          <div className={styles.navBlock}>
            <nav className={styles.navigation} aria-label="Основные разделы">
              <ul>
                <li>
                  <Link to="/category/fashion">мода и стиль</Link>
                </li>
                <li>
                  <Link to="/category/beauty">красота</Link>
                </li>
                <li>
                  <Link to="/category/culture">культура</Link>
                </li>
                <li>
                  <Link to="/category/art">арт&фотографии</Link>
                </li>
                <li>
                  <Link to="/category/music">музыка</Link>
                </li>
                <li>
                  <Link to="/category/news">новости</Link>
                </li>
                <li className={styles.themeContainer}>
                  <span className={styles.colorThemeGrey}>тема</span>
                  <label className={styles.themeSwitch}>
                    <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
                    <span className={styles.slider}></span>
                  </label>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Бургер-меню */}
      <div
        className={`${styles.burgerMenuWrapper} ${isBurgerMenuOpen ? styles.open : ""}`}
      >
        <div className={styles.closeButton} onClick={() => setIsBurgerMenuOpen(false)}>
          <img
            src="/assets/icons/burger_menu-close.png"
            alt="Закрыть меню"
            className={`${styles.closeIcon} ${isDarkTheme ? "ColorInversion" : ""}`}
          />
        </div>

        <div className={styles.burgerMenu}>
          <ul className={styles.menuList}>
            <li>
              <span className={styles.burgerLogoInside}>DR</span>
            </li>
            <li className={styles.paddingDownFromLogo}>
              <Link to="/category/fashion">мода и стиль</Link>
            </li>
            <li>
              <Link to="/category/beauty">красота</Link>
            </li>
            <li>
              <Link to="/category/culture">культура</Link>
            </li>
            <li>
              <Link to="/category/art">арт&фотографии</Link>
            </li>
            <li>
              <Link to="/category/music">музыка</Link>
            </li>
            <li>
              <Link to="/category/news">новости</Link>
            </li>
            <li>
              <div className={styles.themeContainer}>
                <span className={styles.burgerSpanSwitch}>тема</span>
                <label className={styles.themeSwitch}>
                  <input
                    type="checkbox"
                    checked={isDarkTheme}
                    onChange={toggleTheme}
                  />
                  <span className={styles.slider}></span>
                </label>
              </div>
            </li>
          </ul>

          {/* Соцсети в бургере */}
          <div className={styles.socialMediaMobile}>
            <div>
              <a href="#">
                <img
                  src="/assets/icons/inst-icon.png"
                  alt="instagram"
                  className="imgColorInvert"
                />
              </a>
              <a href="#">
                <img
                  src="/assets/icons/telegram-icon.png"
                  alt="telegram"
                  className="imgColorInvert"
                />
              </a>
              <a href="#">
                <img
                  src="/assets/icons/vk-icon.png"
                  alt="vk"
                  className="imgColorInvert"
                />
              </a>
            </div>
            <div>
              <a href="#">
                <img
                  src="/assets/icons/tiktok-icon.png"
                  alt="tiktok"
                  className="imgColorInvert"
                />
              </a>
              <a href="#">
                <img
                  src="/assets/icons/classmates-icon.png"
                  alt="одноклассники"
                  className="imgColorInvert"
                />
              </a>
              <a href="#">
                <img
                  src="/assets/icons/twitter-icon.png"
                  alt="twitter"
                  className="imgColorInvert"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;