import React from "react";
import { DateTime } from "luxon";
import {
  Title,
  Text,
  ImgInfoContainer,
  Temp,
  Unit,
  Thumbnail,
} from "./Weather.styles";

export const Weather = ({ data }) => {
  const time = DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
  const dayOfWeek = DateTime.local().weekdayLong;
  const city = data.name;
  const conditions = data.weather[0].main;
  const temp = Math.floor(data.main.temp);
  const imgUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <div>
      <Title>{city}</Title>
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
