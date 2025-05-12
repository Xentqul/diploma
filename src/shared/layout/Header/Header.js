import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; // ✅ Используем контекст авторизации

// ------------ ИКОНКИ ---------
import changeLangIcon from "@assets/icons/change-lang-icon.png";
import instIcon from "@assets/icons/inst-icon.png";
import tgIcon from "@assets/icons/telegram-icon.png";
import cmIcon from "@assets/icons/classmates-icon.png";
import twIcon from "@assets/icons/twitter-icon.png";
import vkIcon from "@assets/icons/vk-icon.png";
import ttIcon from "@assets/icons/tiktok-icon.png";
import accountIcon from "@assets/icons/account-icon.png";
import accountIconChecked from "@assets/icons/account-icon-checked.png";
import burgerMenuIcon from "@assets/icons/burger_menu-mobile.png";
import burgerMenuCloseIcon from "@assets/icons/burger_menu-close.png";

function Header() {
  const { isAuthenticated, logout } = useAuth(); // ✅ Получаем из контекста
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    // Проверяем, есть ли сохраненная тема в localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  //--------- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ---------
  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      // Сохраняем выбор темы в localStorage
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      // Применяем тему ко всему документу
      document.documentElement.setAttribute(
        "data-theme",
        newTheme ? "dark" : "light"
      );
      return newTheme;
    });
  };

  // Применяем тему при первом рендере
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkTheme ? "dark" : "light"
    );
  }, []);

  //----------- ОТКРЫТИЕ/ЗАКРЫТИЕ БУРГЕР МЕНЮ --------------
  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen((prev) => !prev);
  };

  //-------- ЛОГИКА ДЛЯ СКРОЛЛА НИЖНЕЙ ЧАСТИ ШАПКИ ----------
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsScrollingDown(
        prevScrollPos < currentScrollPos && currentScrollPos > 10
      );
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <header className={styles.header}>
      {/*------------------------------------- КНОПКА АККАУНТА / МОБИЛЬНАЯ ВЕРСИЯ -------------------------------------*/}
      <div className={styles.accountButtonMobile}>
        <Link to={isAuthenticated ? "/account" : "/login"}>
          <img
            src={isAuthenticated ? accountIconChecked : accountIcon}
            alt="account"
            className={`${styles.accountImgMobile} ${
              isDarkTheme ? "ColorInversion" : ""
            }`}
          />
        </Link>
      </div>

      {/*----------- Логотип DR ------------*/}
      <div className={styles.logoMobileWrapper}>
        <Link to={"/"}>
          <span className={styles.logoMobile}>DR</span>
        </Link>
      </div>

      {/*------------------------------------- КНОПКА ОТКРЫТИЯ БУРГЕР МЕНЮ / МОБИЛЬНАЯ ВЕРСИЯ -------------------------------------*/}
      <div
        className={`${styles.burgerButton} ${
          isBurgerMenuOpen ? styles.open : ""
        }`}
        onClick={toggleBurgerMenu}
      >
        <img
          src={burgerMenuIcon}
          alt="меню"
          className={`${styles.burgerMenuIcon} ${
            isDarkTheme ? "ColorInversion" : ""
          }`}
        />
      </div>

      {/*---------------------------------------- ВЕРХНЯЯ ЧАСТЬ ШАПКИ / ДЕСКТОП -----------------------------*/}
      <div className={styles.upperHeader}>
        <div className={styles.wrapper}>
          <div className={styles.logoLanguage}>
            <Link to="/">
              <span className={styles.logo}>DRESSERY</span>
            </Link>
            <hr className={styles.verticalHr} />
            <img
              src={changeLangIcon}
              alt="lang"
              className={`${styles.changeLanguage} ${
                isDarkTheme ? "ColorInversion" : ""
              }`}
            />
          </div>

          {/*---------- СОЦИАЛЬНЫЕ СЕТИ -----------*/}
          <div className={styles.socialAccount}>
            <ul className={styles.socialMedia}>
              <li>
                <a href="#">
                  <img
                    src={instIcon}
                    alt="instagram"
                    className="imgColorInvert"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={tgIcon} alt="telegram" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img
                    src={cmIcon}
                    alt="одноклассники"
                    className="imgColorInvert"
                  />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={twIcon} alt="twitter" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={vkIcon} alt="vk" className="imgColorInvert" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ttIcon} alt="tiktok" className="imgColorInvert" />
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
                src={isAuthenticated ? accountIconChecked : accountIcon}
                alt="account"
                className={`${styles.accountImg} ${
                  isDarkTheme ? "ColorInversion" : ""
                }`}
              />
            </Link>
          </div>
        </div>
      </div>

      {/*----------------------------- НИЖНИЙ БЛОК ШАПКИ С НАВИГАЦИЦЕЙ / ДЕСКТОП --------------------------------*/}
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
                  <Link to="/fashion">мода и стиль</Link>
                </li>
                <li>
                  <Link to="/beauty">красота</Link>
                </li>
                <li>
                  <Link to="/culture">культура</Link>
                </li>
                <li>
                  <Link to="/art">арт&фотографии</Link>
                </li>
                <li>
                  <Link to="/music">музыка</Link>
                </li>
                <li>
                  <Link to="/news">новости</Link>
                </li>
                <li className={styles.themeContainer}>
                  <span className={styles.colorThemeGrey}>тема</span>
                  <label className={styles.themeSwitch}>
                    <input
                      type="checkbox"
                      checked={isDarkTheme}
                      onChange={toggleTheme}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/*--------------------------------------------- БУРГЕР МЕНЮ ----------------------------------- */}
      <div
        className={`${styles.burgerMenuWrapper} ${
          isBurgerMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.closeButton} onClick={toggleBurgerMenu}>
          <img
            src={burgerMenuCloseIcon}
            alt="Закрыть меню"
            className={`${styles.closeIcon} ${
              isDarkTheme ? "ColorInversion" : ""
            }`}
          />
        </div>
        <div className={styles.burgerMenu}>
          <ul className={styles.menuList}>
            <li>
              <span className={styles.burgerLogoInside}>DR</span>
            </li>
            <li className={styles.paddingDownFromLogo}>
              <Link to="/fashion">мода и стиль</Link>
            </li>
            <li>
              <Link to="/beauty">красота</Link>
            </li>
            <li>
              <Link to="/culture">культура</Link>
            </li>
            <li>
              <Link to="/art">арт&фотографии</Link>
            </li>
            <li>
              <Link to="/music">музыка</Link>
            </li>
            <li>
              <Link to="/news">новости</Link>
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

          {/*-------- СОЦИАЛЬНЫЕ СЕТИ / МОБИЛЬНАЯ ВЕРСИЯ --------*/}
          <div className={styles.socialMediaMobile}>
            <div>
              <a href="#">
                <img
                  src={instIcon}
                  alt="instagram"
                  className="imgColorInvert"
                />
              </a>
              <a href="#">
                <img src={tgIcon} alt="telegram" className="imgColorInvert" />
              </a>
              <a href="#">
                <img src={vkIcon} alt="vk" className="imgColorInvert" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={ttIcon} alt="tiktok" className="imgColorInvert" />
              </a>
              <a href="#">
                <img
                  src={cmIcon}
                  alt="одноклассники"
                  className="imgColorInvert"
                />
              </a>
              <a href="#">
                <img src={twIcon} alt="twitter" className="imgColorInvert" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
