import React from "react";
import styles from "./App.module.css";
import WeatherForecast from "./components/Weather-forecast";

const App: React.FunctionComponent = () => {
  return (
    <div className={styles.App}>
      <WeatherForecast />
    </div>
  );
};

export default App;
