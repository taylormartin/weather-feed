import React from "react";
import { DateTime } from "luxon";

export const Weather = ({ data }) => {
  const time = DateTime.local().toLocaleString(DateTime.TIME_SIMPLE);
  const dayOfWeek = DateTime.local().weekdayLong;

  return (
    <div>
      <div>{data.name}</div>
      <div>{dayOfWeek}</div>
      <div>{time}</div>
      <div>{data.weather[0].main}</div>
      <div>{Math.floor(data.main.temp)}&deg;F</div>
      <img
        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt="No image available"
      />
    </div>
  );
};
