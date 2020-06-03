import React from "react";
import {
  getCurrentTimeSimple,
  getCurrentDayOfWeek,
} from "../services/timeService";
import {
  Title,
  Text,
  ImgInfoContainer,
  Temp,
  Unit,
  Thumbnail,
} from "./Weather.styles";

export const Weather = ({ data, location }) => {
  const time = getCurrentTimeSimple();
  const dayOfWeek = getCurrentDayOfWeek();
  const city = location.city;
  const state = location.state_code;
  const conditions = data.weather[0].main;
  const temp = Math.floor(data.main.temp);
  const imgUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <div>
      <Title>{`${city}, ${state}`}</Title>
      <Text>{dayOfWeek + " " + time}</Text>
      <Text>{conditions}</Text>
      <ImgInfoContainer>
        <Thumbnail src={imgUrl} alt="No image available" />
        <Temp>
          {temp}
          <Unit>&deg;F</Unit>
        </Temp>
      </ImgInfoContainer>
    </div>
  );
};
