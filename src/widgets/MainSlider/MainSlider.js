import styles from "./MainSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import articles from "@/data/articles.json";
import { useContext } from "react";
import { ArticleContext } from "@/context/ArticleContext";
import { useTheme } from "@/context/ThemeContext";

function MainSlider() {
  const currentLang = "ru";
  const { usedArticles } = useContext(ArticleContext);
  const { isDarkTheme } = useTheme(); // Получение состояния темы

  // Фильтруем статьи: только опубликованные и не использованные ранее
  const latestArticles = articles
    .filter(
      (a) => a.status === "published" && !usedArticles.includes(a.id)
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 4);

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: `.${styles.sliderNext}`,
          prevEl: `.${styles.sliderPrev}`,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className={styles.swiper}
      >
        {latestArticles.map((article) => {
          const title = article.title?.[currentLang] || "Без заголовка";
          const description = article.description?.[currentLang] || "Нет описания";
          const authorName =
            article.author?.name?.[currentLang] ||
            article.author?.name ||
            "Неизвестный автор";

          return (
            <SwiperSlide key={article.id} className={styles.slide}>
              <div
                className={styles.slideBackground}
                style={{ backgroundImage: `url(${article.images[0]})` }}
              >
                <div className={styles.textBlock}>
                  <div className={styles.textContent}>
                    <a href={article.link} className={styles.titleLink}>
                      <h3 className={styles.title}>{title}</h3>
                    </a>
                    <p className={styles.description}>{description}</p>
                    <AuthorTag id={article.author.id} size="s" color="white">
                      {authorName}
                    </AuthorTag>
                  </div>

                  <div className={styles.readButtonWrapper}>
                    <a href={article.link} className={styles.readLink}>
                      читать›
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Кнопки навигации */}
      <div className={`${styles.sliderPrev} swiper-button-prev-custom`}>
        <img
          src="/assets/icons/to-left.png"
          alt="Предыдущий"
          className={`${styles.arrowImage} ColorInversion`}
        />
      </div>
      <div className={`${styles.sliderNext} swiper-button-next-custom`}>
        <img
          src="/assets/icons/to-right.png"
          alt="Следующий"
          className={`${styles.arrowImage} ColorInversion`}
        />
      </div>
    </div>
  );
}

export default MainSlider;