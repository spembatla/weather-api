import React, { useState, useEffect } from "react";
import "./App.css";

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
  }, []);

  const getTime = (time) => {
    const t = time?.split(" ")[1];
    return t;
  };

  const getForcastData = () => {
    const arr = (weathers && weathers.forecast.forecastday) || [];
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
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
  


  console.log("today forcast data ==>", todayForecast);

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
            <div className="high">H:{todayForecast && todayForecast.day.maxtemp_c}&deg;c</div>
            <div className="low">L:{todayForecast && todayForecast.day.mintemp_c}&deg;c</div>
          </div>
        </div>
      </div>
      <div className="Right">
        <div className="cube">
          <div>Thunderstrom expected around on 00:00</div>
          <hr />
          <div className="today">
            <div className="now">
              <div>Now</div>
              <div>
                <img src={weathers && weathers.current.condition.icon} />
              </div>
              <div>{weathers && weathers.current.temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>00</div>
              <div>
                <img src={todayForecast && todayForecast.hour[0].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[0].temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>01</div>
              <div>
                <img src={todayForecast && todayForecast.hour[1].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[1].temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>02</div>
              <div>
                <img src={todayForecast && todayForecast.hour[2].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[2].temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>03</div>
              <div>
                <img src={todayForecast && todayForecast.hour[3].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[3].temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>04</div>
              <div>
                <img src={todayForecast && todayForecast.hour[4].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[4].temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>05</div>
              <div>
                <img src={todayForecast && todayForecast.hour[5].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[5].temp_c}&deg;c</div>
            </div>
            <div className="now">
              <div>06</div>
              <div>
                <img src={todayForecast && todayForecast.hour[6].condition.icon} />
              </div>
              <div>{todayForecast && todayForecast.hour[6].temp_c}&deg;c</div>
            </div>
            
            
            
          </div>
        </div>
        <div className="cube">
          <div>5-Day Forecast</div>
          <hr />
          <div className="forecast">
            {
              weathers && weathers.forecast.forecastday.map((weather, i) => {
                return <div key={i}>{weather.date}</div>
              })
            }
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
