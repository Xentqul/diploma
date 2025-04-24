import React from "react";
import styles from "@/pages/MainPage/MainPage.module.css";
import FirstArticleCard from "./components/FirstArticleCard/FirstArticleCard";
import LatestNewsBlock from "./components/LatestNewsBlock/LatestNewsBlock";
import SeasonalTrends from "./components/SeasonalTrendsBlock/SeasonalTrends";
import FashionBlock from "./components/FashionBlock/FashionBlock";
import MidAd from "./components/MidAd/MidAd";
import CultureBlock from "./components/CultureBlock/CultureBlock";
import BeautyBlock from "./components/BeautyBlock/BeautyBlock";
import MusicBlock from "./components/MusicBlock/MusicBlock";
import ArtPhotoBlock from "./components/ArtPhotoBlock/ArtPhotoBlock";
import LoginPage from "@/pages/LogInPage/LogInPage.js";

function MainPage() {
  return (
    <div className={styles.mainWrapperForAll}>
      <FirstArticleCard />
      <hr className={styles.hrMainPage} />
      <LatestNewsBlock />
      <SeasonalTrends />
      <FashionBlock />
      <MidAd />
      <CultureBlock />
      <hr className={styles.hrMainPage2} />
      <BeautyBlock />
      <MusicBlock />
      <ArtPhotoBlock />
    </div>
  );
}

export default MainPage;
