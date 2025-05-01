import React from "react";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Импортируем Link

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
// ------------ ИКОНКИ -----------

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние авторизации
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Состояние для темы
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false); // Состояние бургер-меню
  const [isScrollingDown, setIsScrollingDown] = useState(false); // Состояние скролла
  const [prevScrollPos, setPrevScrollPos] = useState(0);

    // Проверяем авторизацию при загрузке
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);

  //--------- ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ---------
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // ----------- ОТКРЫТИЕ/ЗАКРЫТИЕ БУРГЕР МЕНЮ --------------
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
        <Link to={isLoggedIn ? "/account" : "/login"}>
          <img
            src={isLoggedIn ? accountIconChecked : accountIcon}
            alt="account"
            className={styles.accountImgMobile}
          />
        </Link>
      </div>

      {/*----------- Логотип DR ------------*/}
      <div className={styles.logoMobileWrapper}>
        <span className={styles.logoMobile}>DR</span>
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
          className={styles.burgerMenuIcon}
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
              className={styles.changeLanguage}
            />
          </div>
          {/*---------- СОЦИАЛЬНЫЕ СЕТИ -----------*/}
          <div className={styles.socialAccount}>
            <ul className={styles.socialMedia}>
              <li>
                <a href="#">
                  <img src={instIcon} alt="instagram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={tgIcon} alt="telegram" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={cmIcon} alt="одноклассники" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={twIcon} alt="twitter" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={vkIcon} alt="vk" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={ttIcon} alt="tiktok" />
                </a>
              </li>
            </ul>
            <hr className={styles.verticalHr} />
            {!isLoggedIn && (
              <Link to="/login" className={styles.accountButton}>
                Войти
              </Link>
            )}
            
            {/* Иконка аккаунта */}
            <Link to={isLoggedIn ? "/account" : "/login"}>
              <img
                src={isLoggedIn ? accountIconChecked : accountIcon}
                alt="account"
                className={styles.accountImg}
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
            {/*-------------------- НАВИГАЦИЯ ------------------*/}
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

                {/*------------ ПЕРЕКЛЮЧАТЕЛЬ ТЕМ  ------------*/}
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
            className={styles.closeIcon}
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
              {/*------------ ПЕРЕКЛЮЧАТЕЛЬ ТЕМ / МОБИЛЬНАЯ ВЕРСИЯ ---------------*/}
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
                <img src={instIcon} alt="instagram" />
              </a>
              <a href="#">
                <img src={tgIcon} alt="telegram" />
              </a>
              <a href="#">
                <img src={vkIcon} alt="vk" />
              </a>
            </div>
            <div>
              <a href="#">
                <img src={ttIcon} alt="tiktok" />
              </a>
              <a href="#">
                <img src={cmIcon} alt="одноклассники" />
              </a>
              <a href="#">
                <img src={twIcon} alt="twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
