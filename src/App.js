import React from "react";
import { useWeatherData } from "./services/apiService";
import { Weather } from "./components/Weather";

function App() {
  const { loading, value: response } = useWeatherData();

  return loading ? (
    <div>loading...</div>
  ) : response.error ? (
    <div>There was an error</div>
  ) : (
    <Weather data={response.data} />
  );
}

export default App;
