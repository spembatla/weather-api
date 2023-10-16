import React, { useState, useEffect } from "react";
import "./App.css";
import RangeSlider from "./rangeSlider.component";

function App() {
  const [weathers, setWeathers] = useState();
  const [todayForecast, setTodayForecast] = useState(null);

  const getCurrentWeather = async () => {
    const response = await fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=674ef30834a841be862135135231110&q=bhiwandi&days=5&aqi=no&alerts=no"
    );
    const weather = await response.json();
    setWeathers(weather);
  };

  useEffect(() => {
    getCurrentWeather();
    getForcastData();
    getDay();
  }, []);

  const getTime = (time) => {
    const t = time?.split(" ")[1];
    return t;
  };

  const getForcastData = () => {
    const arr = (weathers && weathers.forecast.forecastday) || [];
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth() + 1
      }-${date.getDate()}`;
    let foundElement = null;

    for (let i = 0; i < arr.length; i++) {
      const e = arr[i];
      if (e.date === today) {
        foundElement = e;
      }
    }

    if (foundElement) {
      setTodayForecast(foundElement);
    }
  };

  const getHour = (time) => {
    const d = new Date(time);
    return d.getHours();
  };

  const getDay = (day) => {
    const d = new Date(day);
    return d.getDay();
  };

  const day = (date) => {
    const d = new Date(date);
    const dNum = d.getDay();
    const weekDays = {
      0: "Sun",
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
    };

    return weekDays[dNum];
  };

  const convertTextToDeg = (str) => {
    const t = `${str}&deg;`;
    const dom = new DOMParser();
    const parser = dom.parseFromString(t, "text/html");
    return parser.body.innerHTML;
  };

  return (
    <div className="weather-app">
      <div className="Left">
        <div className="box">
          <div className="line-one">
            <div className="degree">
              {weathers && weathers.current.temp_c}&deg;c
            </div>
            <div className="image">
              <img
                src={weathers && weathers.current.condition.icon}
                alt="weather"
              />
            </div>
          </div>
          <div className="line-two">
            <div className="location">
              {weathers && weathers.location.name},{" "}
              {weathers && weathers.location.region},{" "}
              {weathers && weathers.location.country}
            </div>
          </div>
          <div className="line-three">
            <div className="gap">
              <div className="time">
                {getTime(weathers && weathers.current.last_updated)}
              </div>
              <div>|</div>
            </div>
            <div className="high">
              H:{todayForecast && todayForecast.day.maxtemp_c}&deg;c
            </div>
            <div className="low">
              L:{todayForecast && todayForecast.day.mintemp_c}&deg;c
            </div>
          </div>
        </div>
      </div>
      <div className="Right">
        <div className="cube">
          <div className="text">Thunderstrom expected around on 00:00</div>
          <hr />
          <div className="day-forcast">
            {todayForecast &&
              todayForecast.hour.map((forecast, i) => {
                return (
                  <div key={i} className="day">
                    <div className="f-time">{getHour(forecast.time)}</div>
                    <div className="f-img">
                      <img
                        src={forecast.condition.icon}
                        alt={forecast.condition.text}
                      />
                    </div>
                    <div className="f-temp">
                      {convertTextToDeg(forecast.temp_c)}c
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="cube">
          <div className="text">5 - Day Forecast</div>
          <hr />
          <div className="forecast">
            {weathers &&
              weathers.forecast.forecastday.map((weather, i) => {
                return (
                  <div key={i} className="daily">
                    <div className="f-day">{day(weather.date)}</div>
                    <div className="f-img">
                      <img
                        src={weather.day.condition.icon}
                        alt={weather.day.condition.text}
                      />
                    </div>
                    <div className="f-low">
                      {convertTextToDeg(weather.day.mintemp_c)}c
                    </div>
                    <div className="f-range">
                      <RangeSlider minValue={weather.day.mintemp_c} maxValue={weather.day.maxtemp_c} />
                    </div>
                    <div className="f-high">
                      {convertTextToDeg(weather.day.maxtemp_c)}c
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
