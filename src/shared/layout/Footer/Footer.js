import React from "react";
import styles from "./Footer.module.css";
import instIcon from "@assets/icons/inst-icon.png";
import tgIcon from "@assets/icons/telegram-icon.png";
import cmIcon from "@assets/icons/classmates-icon.png";
import twIcon from "@assets/icons/twitter-icon.png";
import vkIcon from "@assets/icons/vk-icon.png";
import ttIcon from "@assets/icons/tiktok-icon.png";

function Footer() {
  return (
    <footer>
      <div className={styles.wrapper}>
        <div className={styles.leftFooterPart}>
          <span className={styles.logo}>DRESSERY</span>
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

          <p className={styles.commission}>
            Мы можем получать комиссионные за ссылки на этой странице, но мы
            рекомендуем только те продукты, на которые сами ссылаемся.
          </p>
          <p className={styles.rights}>©2025 DRESSERY. All Rights Reserved.</p>
        </div>
        <div className={styles.navigationBlock}>
          <nav aria-label="Разделы журнала">
            <ul>
              <li>
                <a href="#">Главная</a>
              </li>
              <li>
                <a href="#">Арт&фотографии</a>
              </li>
              <li>
                <a href="#">Мода и стиль</a>
              </li>
              <li>
                <a href="#">Культура</a>
              </li>
              <li>
                <a href="#">Красота</a>
              </li>
              <li>
                <a href="#">Новости</a>
              </li>
              <li>
                <a href="#">Музыка</a>
              </li>
            </ul>
          </nav>

          <div class={styles.footerUtils}>
            <a href="#">Аккаунт</a>
            <a href="#">Вакансии</a>
            <a href="#">Контакты</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
