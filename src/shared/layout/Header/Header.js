import React from "react";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import changeLangIcon from "@assets/icons/change-lang-icon.png";
import instIcon from "@assets/icons/inst-icon.png";
import tgIcon from "@assets/icons/telegram-icon.png";
import cmIcon from "@assets/icons/classmates-icon.png";
import twIcon from "@assets/icons/twitter-icon.png";
import vkIcon from "@assets/icons/vk-icon.png";
import ttIcon from "@assets/icons/tiktok-icon.png";
import accountIcon from "@assets/icons/account-icon.png";

function Header() {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Состояние для темы

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    console.log("Тема изменена на:", isDarkTheme ? "Светлая" : "Темная"); // Выводим в консоль
  };

  // Нижняя навигация, скроллинг

  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

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
      <div className={styles.upperHeader}>
        <div className={styles.wrapper}>
          <div className={styles.logoLanguage}>
            <a href="index.html">
              <span className={styles.logo}>DRESSERY</span>
            </a>
            <hr className={styles.verticalHr} />
            <img
              src={changeLangIcon}
              alt="lang"
              className={styles.changeLanguage}
            />
          </div>

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
            <a href="#" className={styles.accountButton}>
              Войти
            </a>
            <a href="#">
              <img
                src={accountIcon}
                alt="account"
                className={styles.accountImg}
              />
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles.lowerHeaderBlock} ${isScrollingDown ? styles.hidden : ''}`}>
        <div className={styles.wrapper}>
          <div className={styles.navBlock}>
            <nav className={styles.navigation} aria-label="Основные разделы">
              <ul>
                <li>
                  <a href="#">мода и стиль</a>
                </li>
                <li>
                  <a href="#">красота</a>
                </li>
                <li>
                  <a href="#">культура</a>
                </li>
                <li>
                  <a href="#">арт&фотографии</a>
                </li>
                <li>
                  <a href="#">музыка</a>
                </li>
                <li>
                  <a href="#">новости</a>
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
    </header>
  );
}

export default Header;
