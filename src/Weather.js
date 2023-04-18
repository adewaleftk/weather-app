// import React, { useState } from 'react';

// function Weather() {
//   const [location, setLocation] = useState('');
//   const [temperature, setTemperature] = useState('');
//   const [description, setDescription] = useState('');
//   const [icon, setIcon] = useState('');
//   const [error, setError] = useState('');

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const apiKey = '219a8468fcccfba50b40babdc5a69251';
//       const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}&units=metric`;
//       const response = await fetch(url);
//       const data = await response.json();
//       setTemperature(data.main.temp);
//       setDescription(data.weather[0].description);
//       setIcon(data.weather[0].icon);
//       setError('');
//     } catch (error) {
//       setError('Could not fetch weather data. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleFormSubmit}>
//         <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} />
//         <button type="submit">Get Weather</button>
//       </form>
//       {error && <div>{error}</div>}
//       {temperature && (
//         <div>
//           <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" />
//           <div>{description}</div>
//           <div>{temperature}°C</div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Weather;


import React from 'react';
import { useState } from 'react';
import './Weather.css';

function Weather() {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const api = {
    
        key: "219a8468fcccfba50b40babdc5a69251",
        base: "https://api.openweathermap.org/data/2.5/"
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

    return (
        <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
          <main>
            <div className="search-box">
              <input 
                type="text"
                className="search-bar"
                placeholder="Type Location to get your current weather update"
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>
            {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {Math.round(weather.main.temp)}°c
                </div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
            ) : ('')}
          </main>
        </div>
      );
    
}

export default Weather