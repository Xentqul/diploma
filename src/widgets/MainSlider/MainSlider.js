import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./MainSlider.module.css";
import toLeftButton from "@assets/icons/to-left.png";
import toRightButton from "@assets/icons/to-right.png";
import { AuthorTag } from "@/shared/ui/AuthorTag/AuthorTag";
import slide1 from "@/assets/main-pics/main-slider/slide-1.webp";
import slide2 from "@/assets/main-pics/main-slider/slide-2.webp";
import slide3 from "@/assets/main-pics/main-slider/slide-3.webp";
import slide4 from "@/assets/main-pics/main-slider/slide-4.webp";

let slides = [
  {
    id: 1,
    bgImage: `url(${slide1})`,
    title: "Показ CHANEL Весна-Лето 2025",
    description:
      "Цветы, золото и струящиеся ткани: как легкость воплощается в жизнь с новой коллекцией",
    author: "автор: павел нестеров",
    authorId: "pavel_nesterov",
    link: "#",
  },
  {
    id: 2,
    bgImage: `url(${slide2})`,
    title: "Кьюри наконец сделала это",
    description: "Мария Кьюри возвращается с триумфальной осенью-зимой 2025.",
    author: "автор: мария говорунова",
    authorId: "maria_govorunova",
    link: "#",
  },
  {
    id: 3,
    bgImage: `url(${slide3})`,
    title: "Из Balenciaga в Gucci",
    description:
      "Крупные перестановки в мире моды продалжаются и в этот раз настигли Gucci в лице Демны Гвасалии",
    author: "автор: павел нестеров",
    authorId: "pavel_nesterov",
    link: "#",
  },
  {
    id: 4,
    bgImage: `url(${slide4})`,
    title: "Донателла Версаче покидает VERSACE",
    description:
      "Уход Донателлы знаменует дому новый творческий этап под руководством Дарио Виталле",
    author: "автор: мария говорунова",
    authorId: "maria_govorunova",
    link: "#",
  },
];

function MainSlider() {
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
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className={styles.slide}>
            <div
              className={styles.slideBackground}
              style={{ backgroundImage: slide.bgImage }}
            >
              <div className={styles.textBlock}>
                <div className={styles.textContent}>
                  <a
                    href={`/articles/${slide.id}`}
                    className={styles.titleLink}
                  >
                    <h3 className={styles.title}>{slide.title}</h3>
                  </a>

                  <p className={styles.description}>{slide.description}</p>

                  <AuthorTag
                    href={`/authors/${slide.authorId}`}
                    size="s"
                    color="white"
                    weigth="weightRegular"
                  >
                    {slide.author}
                  </AuthorTag>
                </div>

                <div className={styles.readButtonWrapper}>
                  <a href={`/articles/${slide.id}`} className={styles.readLink}>
                    читать›
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={`${styles.sliderPrev} swiper-button-prev-custom`}>
        <img
          src={toLeftButton}
          alt="Предыдущий"
          className={styles.arrowImage}
        />
      </div>
      <div className={`${styles.sliderNext} swiper-button-next-custom`}>
        <img
          src={toRightButton}
          alt="Следующий"
          className={styles.arrowImage}
        />
      </div>
    </div>
  );
}

export default MainSlider;
