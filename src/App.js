import React, { useState } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import logo from "./assets/images/logo.png";

const api = {
  key: "06ddd03d11d9a328c9ecbdd226fb407f",
  base: "http://api.openweathermap.org/data/2.5/",
  icon: "https://openweathermap.org/img/w",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div className="container">
      <Header className="alert bg-warning text-center" />
      <div className="row">
        <div className="col-md-4 col-sm-12 my-3">
          Today: {moment().format("dddd")} {moment().format("LL")}
        </div>
      </div>
      <div className="row">
        <div className="search-panel col-sm-12  col-md-4 my-3">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>
      </div>

      {typeof weather.main != "undefined" ? (
        <div className="row d-flex justify-content-center align-items-center">
          <div className="search-panel col-md-4 col-sm-12 my-3">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h2>
                  {console.log(weather)}
                  {weather.name}, {weather.sys.country}
                </h2>
              </div>
              <div className="card-body bg-warning">
                <div className="temp">
                  <h3>
                    {Math.round(weather.main.temp)} °C, <br /> but feels like:{" "}
                    {weather.main.feels_like} °C
                  </h3>
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <p className="card-text">{weather.weather[0].description}</p>
                <div id="icon">
                  <img
                    src={`${api.icon}/${weather.weather[0].icon}.png`}
                    alt=""
                  />
                </div>
                <div className="weather">Speed wind: {weather.wind.speed}</div>
                <div className="weather">Humidity: {weather.main.humidity}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

const Image = (props) => {
  return <img src={props.src} alt="logo" style={{ width: "100px" }} />;
};

const Header = (props) => {
  return (
    <div className={props.className}>
      <Image src={logo} />
      <h1>Weather</h1>
    </div>
  );
};

export default App;
