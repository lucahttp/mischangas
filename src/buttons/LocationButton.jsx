import React, { useState } from 'react';

function LocationButton({ savedLocation, onGet}) {
  const [deviceLocationIsSupported, setDeviceLocationIsSupported] = useState(null);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [shortLocation, setShortLocation] = useState(null);

  function handleLocationClick(event) {
    event.preventDefault()
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
      setDeviceLocationIsSupported(false)
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap

    var myURL = `https://photon.komoot.io/reverse?lat=${latitude}&lon=${longitude}`;
    //var myURL = `https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=18&format=https://nominatim.openstreetmap.org/reverse.php?lat=31.33117&lon=-103.35938&zoom=18&format=geocodejson&accept-language=es`;
    var myURL = `https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&format=geocodejson&accept-language=es`;
    fetch(myURL, {
      method: 'GET'
    })
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
        var demoLoc = {
          country: dat.geocoding.country,
          state: dat.geocoding.state,
          county: dat.geocoding.county,
          district: dat.geocoding.district,
        }
        console.log(demoLoc)
        var LocText = dat.geocoding.district + ", " + dat.geocoding.state


        setShortLocation(LocText)
        onGet(demoLoc, LocText)
        /*
        console.log({
          country: dat.address.country,
          state: dat.address.state,
          //county: dat.address.county,
          suburb: dat.address.suburb,
          //district: dat.address.district,
          district: dat.address.state_district,
        })*/


        setWeather(data);
      })
      .catch(error => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <>
      <div className="join w-full">
        <div className="w-4/5">
          <label className="join-item input input-bordered flex items-center gap-2">

            <input type="text" className="grow " value={(shortLocation || savedLocation) || ""} disabled />
          </label>
        </div>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">!</span>
          <button className="btn btn-primary join-item" onClick={handleLocationClick}>Set Location</button>
        </div>
      </div>
      <div>
        {/**
       * 
      {!location ? <button onClick={handleLocationClick}>Get Location</button> : null}
      {location && !weather ? <p>Loading weather data...</p> : null}
      {weather ? (
        <div>
          <p>Location: {JSON.stringify(weather)}</p>
      <p>{JSON.stringify(weather)}</p>
        </div>
      ) : null}
       */}
      </div>
    </>
  );
}

export default LocationButton;