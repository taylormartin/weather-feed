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
        reject(new Error("Could not get location coordinates"));
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
      reject(new Error("Error fetching location data"));
    }
  });
};

const getWeatherData = (coord) => {
  return new Promise(async (resolve, reject) => {
    const url = `${BASE_URL}/weather?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${OPEN_WEATHER_API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      resolve({ data });
    } else {
      reject(new Error("Error fetching weather data"));
    }
  });
};

export const useWeatherData = () => {
  return useAsync(async () => {
    try {
      const coord = await getLocationCoord();
      const locationData = await getLocationData(coord);
      const weatherData = await getWeatherData(coord);
      return { location: locationData.location, data: weatherData.data };
    } catch (err) {
      return { error: true, message: err.message };
    }
  }, []);
};
