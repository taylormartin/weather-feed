import { useAsync } from "react-use";

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
const CITY_ID = 4180439;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeatherData = () => {
  return useAsync(async () => {
    const url = `${BASE_URL}/weather?id=${CITY_ID}&units=imperial&appid=${API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      return { error: true };
    }
  }, []);
};
