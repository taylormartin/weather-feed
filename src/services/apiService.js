import { useAsync } from "react-use";

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
const OPEN_CAGE_API_KEY = process.env.REACT_APP_OPEN_CAGE_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const OPEN_CAGE_URL = "https://api.opencagedata.com/geocode/v1/json";

const getLocationCoord = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        resolve({ lat, lon });
      },
      () => {
        reject({ error: true });
      }
    );
  });
};

const getLocationData = ({ lat, lon }) => {
  return new Promise(async (resolve, reject) => {
    const url = `${OPEN_CAGE_URL}?key=${OPEN_CAGE_API_KEY}&q=${encodeURIComponent(
      lat + "," + lon
    )}&pretty=1&no_annotations=1`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const location = data.results[0].components;
      resolve({ location });
    } else {
      reject({ error: true });
    }
  });
};

export const useWeatherData = () => {
  return useAsync(async () => {
    const { lat, lon } = await getLocationCoord();
    const { location } = await getLocationData({ lat, lon });

    const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return { location, data };
    } else {
      return { error: true };
    }
  }, []);
};
