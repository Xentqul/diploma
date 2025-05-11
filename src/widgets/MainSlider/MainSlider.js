import styles from "./MainSlider.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import toLeftButton from "@assets/icons/to-left.png";
import toRightButton from "@assets/icons/to-right.png";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import articles from "@/data/articles.json";
import { useContext, useEffect } from "react";
import { ArticleContext } from "@/context/ArticleContext";

// Явно импортируем изображения
const images = {
  "/assets/main-pics/main-slider/slide-1.webp": require("@/assets/main-pics/main-slider/slide-1.webp"),
  "/assets/main-pics/main-slider/slide-2.webp": require("@/assets/main-pics/main-slider/slide-2.webp"),
  "/assets/main-pics/main-slider/slide-3.webp": require("@/assets/main-pics/main-slider/slide-3.webp"),
  "/assets/main-pics/main-slider/slide-4.webp": require("@/assets/main-pics/main-slider/slide-4.webp"),
  '/assets/main-pics/fashion/main-fashion-article.webp': require("@/assets/main-pics/fashion/main-fashion-article.webp"),
};

function MainSlider() {
  const currentLang = 'ru';
 const { usedArticles } = useContext(ArticleContext);

  const latestArticles = articles
    .filter(a => 
      a.status === 'published' && 
      !usedArticles.includes(a.id) // Исключаем главную статью
    )
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 4);



  // 3. Рендерим слайдер (даже если usedArticles еще не обновился)

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
        {latestArticles.map((article) => (
          <SwiperSlide key={article.id} className={styles.slide}>
            <div
              className={styles.slideBackground}
              style={{ backgroundImage: `url(${images[article.images[0]]})` }}
            >
              <div className={styles.textBlock}>
                <div className={styles.textContent}>
                  <a href={article.link} className={styles.titleLink}>
                    <h3 className={styles.title}>{article.title[currentLang]}</h3>
                  </a>
                  <p className={styles.description}>{article.description[currentLang]}</p>
                  <AuthorTag
                    href={`/authors/${article.author.id}`}
                    size="s"
                    color="white"
                    weigth="weightRegular"
                  >
                    {article.author.name[currentLang]}
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
        ))}
      </Swiper>
      <div className={`${styles.sliderPrev} swiper-button-prev-custom`}>
        <img src={toLeftButton} alt="Предыдущий" className={styles.arrowImage} />
      </div>
      <div className={`${styles.sliderNext} swiper-button-next-custom`}>
        <img src={toRightButton} alt="Следующий" className={styles.arrowImage} />
      </div>
    </div>
  );
}

export default MainSlider;