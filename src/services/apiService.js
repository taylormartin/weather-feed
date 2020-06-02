import { useAsync } from "react-use";

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
const CITY_ID = 4180439;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
// https://api.opencagedata.com/geocode/v1/json?q=51.952659%2C%207.632473&key=YOUR-API-KEY&language=en&pretty=1

const getLocationCoord = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      () => {
        reject({ error: true });
      }
    );
  });
};

export const useWeatherData = () => {
  return useAsync(async () => {
    const coords = await getLocationCoord();
    // const city = await getLocationData();
    console.log(coords);

    const url = `${BASE_URL}/weather?id=${CITY_ID}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      return { error: true };
    }
  }, []);
};
