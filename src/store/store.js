import { configureStore } from "@reduxjs/toolkit";
import currentWeatherReducer from "./slices/currentWeatherSlice";
import weeklyWeatherReducer from "./slices/weeklyWeatherSlice";

export default configureStore({
    reducer: {
      currentWeather: currentWeatherReducer,
      weeklyWeather: weeklyWeatherReducer,
    },
  });