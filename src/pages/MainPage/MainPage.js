import React from "react";
import styles from "@/pages/MainPage/MainPage.module.css";
import FirstArticleCard from "@/pages/MainPage/components/FirstArticleCard/FirstArticleCard";
import LatestNewsBlock from "./components/LatestNewsBlock/LatestNewsBlock";
import SeasonalTrends from "./components/SeasonalTrendsBlock/SeasonalTrends";

function Main() {
  return (
    <>
      <FirstArticleCard />
      <hr className={styles.hrMainPage}/>
      <LatestNewsBlock />
      <SeasonalTrends />
    </>
  );
}

export default Main;
