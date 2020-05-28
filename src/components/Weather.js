import React from "react";
import { DateTime } from "luxon";

export const Weather = ({ data }) => {
  const time = DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
  const dayOfWeek = DateTime.local().weekdayLong;
  const city = data.name;
  const conditions = data.weather[0].main;
  const temp = Math.floor(data.main.temp);
  const imgUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  return (
    <div>
      <div>{city}</div>
      <div>{dayOfWeek}</div>
      <div>{time}</div>
      <div>{conditions}</div>
      <div>{temp}&deg;F</div>
      <img src={imgUrl} alt="No image available" />
    </div>
  );
};
