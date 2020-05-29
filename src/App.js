import React from "react";
import { useWeatherData } from "./services/apiService";
import { Weather } from "./components/Weather";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

function App() {
  const { loading, value: response } = useWeatherData();

  return (
    <Container>
      {loading ? (
        <div>loading...</div>
      ) : response.error ? (
        <div>There was an error</div>
      ) : (
        <Weather data={response.data} />
      )}
    </Container>
  );
}

export default App;
