import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ location }) =>{
    let access_key = require('../credentials.json').weatherstack_access_key
    
    const [ weatherdata, setWeatherdata ] = useState({})

    const getWeatherdata = () => {
        axios
            .get(`http://api.weatherstack.com/forecast?access_key=${access_key}&query=${location}`)
            .then(response => {
                setWeatherdata({...weatherdata, ...response.data.current})
            })
    }

    useEffect(getWeatherdata, [])

    return (
        <div>
            <h2>Weather in {location}</h2>
            <b>temperature:</b> {weatherdata.temperature} Celsius <br />
            <img src={weatherdata.weather_icons} width="50" height="50" alt="weather icon"/> <br />
            <b>wind:</b> {weatherdata.wind_speed} kph direction {weatherdata.wind_dir}
        </div>
    )
}

export default Weather