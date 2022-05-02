import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [weathers, setWeather] = useState("");
  const [location, setLocation] = useState("Ho Chi Minh City");
  const [icon, setIcon] = useState("");
  const [isMouseOver, setMouseOver] = useState(false);
  function handleChange(event) {
    setLocation(event.target.value);
    //console.log(event.target.value);
  }

  function handleClick(event) {
    console.log("weather", weathers);
    event.preventDefault();
    fetchWeatherVn();
  }

  function HandleOnMouseOver() {
    setLocation(true);
  }

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=da71e91d41471063585ee104d08f29ab`;
  //key: da71e91d41471063585ee104d08f29ab

  const icon_URL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const fetchWeatherVn = async () => {
    const response = await axios.get(API_URL);
    //console.log(response.data.weather[0].icon);
    setWeather(response.data);
    setIcon(response.data.weather[0].icon);
    // console.log("Press");

    //console.log(response.data.main);
  };

  useEffect(() => {
    fetchWeatherVn();
  }, []);

  //   console.log("weather", weather);

  //   console.log("cityname", weather.name);

  return (
    <>
      <main>
        <div className="Header">
          <h1>Welcome to Weather Forecast</h1>
          <p>
            This project created with Reactjs. Write the city name that you want
            to check the weather in the search bar below and click Search{" "}
          </p>
        </div>
        <div className="searchbar">
          <form onSubmit={handleClick}>
            <input
              onChange={handleChange}
              type="text"
              placeholder=" search by city"
            />
            <button
              style={{ backgroundColor: isMouseOver ? "orange" : "crimson" }}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
        <div className="container" key={weathers.id}>
          <div className="location">
            <h3>{weathers.name}</h3>
          </div>
          <div className="temp">
            {weathers.main ? <h1>{weathers.main.temp} &deg;C </h1> : null}
          </div>

          <div className="icon">
            {weathers.main ? (
              <img src={icon_URL} alt={weathers.weather[0].main} />
            ) : null}
          </div>

          <div className="description">
            {weathers.main ? <h3>{weathers.weather[0].main}</h3> : null}
          </div>
          <div className="temp-minmax">
            {weathers.main ? (
              <p>
                H: {weathers.main.temp_max} L: {weathers.main.temp_min}
              </p>
            ) : null}
          </div>
          <div className="addition">
            <div className="feellike">
              {weathers.main ? (
                <p>
                  <strong>Feel Like: </strong>
                  {weathers.main.feels_like}
                </p>
              ) : null}
            </div>

            <div className="humidity">
              {weathers.main ? (
                <p>
                  <strong>Humidity: </strong>
                  {weathers.main.humidity}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
