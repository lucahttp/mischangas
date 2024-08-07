import React, { useState } from 'react';

function WeatherApp() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    fetch(`https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`, {
        method: 'GET'})
      .then(response => response.json())
      .then(data => {
        console.log(data);


        /**
         * 
         * 
country
state
county
district
         */
        const dat = data.features[0].properties
        console.log(dat)
        const array = data.features
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
        }
        setWeather(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div>
      {!location ? <button onClick={handleLocationClick}>Get Location</button> : null}
      {location && !weather ? <p>Loading weather data...</p> : null}
      {weather ? (
        <div>
          <p>Location: {JSON.stringify(weather)}</p>
      <p>{JSON.stringify(weather)}</p>
        </div>
      ) : null}
    </div>
  );
}

export default WeatherApp;