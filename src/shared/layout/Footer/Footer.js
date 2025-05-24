import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.leftFooterPart}>
          <span className={styles.logo}>DRESSERY</span>

          <ul className={styles.socialMedia}>
            <li>
              <a href="/category/fashion">
                <img
                  src="/assets/icons/inst-icon.png"
                  alt="instagram"
                  className="imgInvertDisable"
                />
              </a>
            </li>
            <li>
              <a href="/category/music">
                <img
                  src="/assets/icons/telegram-icon.png"
                  alt="telegram"
                  className="imgInvertDisable"
                />
              </a>
            </li>
            <li>
              <a href="/category/art">
                <img
                  src="/assets/icons/classmates-icon.png"
                  alt="одноклассники"
                  className="imgInvertDisable"
                />
              </a>
            </li>
            <li>
              <a href="/category/culture">
                <img
                  src="/assets/icons/twitter-icon.png"
                  alt="twitter"
                  className="imgInvertDisable"
                />
              </a>
            </li>
            <li>
              <a href="/category/fashion">
                <img
                  src="/assets/icons/vk-icon.png"
                  alt="vk"
                  className="imgInvertDisable"
                />
              </a>
            </li>
            <li>
              <a href="/category/art">
                <img
                  src="/assets/icons/tiktok-icon.png"
                  alt="tiktok"
                  className="imgInvertDisable"
                />
              </a>
            </li>
          </ul>

          <div className={styles.textFooterCombinate}>
            <p className={styles.commission}>
              Мы можем получать комиссионные за ссылки на этой странице, но мы
              рекомендуем только те продукты, на которые сами ссылаемся.
            </p>
            <p className={styles.rights}>
              ©2025 DRESSERY. All Rights Reserved.
            </p>
          </div>
        </div>

        <div className={styles.navigationBlock}>
          <nav aria-label="Разделы журнала">
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/category/art">Арт & Фотографии</Link>
              </li>
              <li>
                <Link to="/category/fashion">Мода и стиль</Link>
              </li>
              <li>
                <Link to="/category/culture">Культура</Link>
              </li>
              <li>
                <Link to="/category/beauty">Красота</Link>
              </li>
              <li>
                <Link to="/news">Новости</Link>
              </li>
              <li>
                <Link to="/category/music">Музыка</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.footerUtils}>
            <Link to="/account">Аккаунт</Link>
            <Link to="/vacancies">Вакансии</Link>
            <Link to="/contacts">Контакты</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;