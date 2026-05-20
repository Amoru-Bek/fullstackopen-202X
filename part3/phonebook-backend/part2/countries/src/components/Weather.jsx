import { useEffect, useState } from "react"
import axios from "axios"
const Weather = ({searchedCountries}) =>{
    const[weather,setWeather] = useState(null)
    useEffect(()=>{
            if (searchedCountries.length === 1)
        {
                const capital = searchedCountries[0].capital[0]
                const api_key = import.meta.env.VITE_WEATHER_API_KEY
                
                
                
                axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
                .then(response => {
                    // console.log(response.data)
                    setWeather(response.data)
                    })
        }
        },[searchedCountries])
        return (
            <>
                <h2>Weather in {searchedCountries[0].capital}</h2>
                <p>Temperature {weather !== null && (weather.main.temp)}</p>
                <img src={`https://openweathermap.org/payload/api/media/file/${weather !== null && (weather.weather[0].icon)}.png`} alt="" />
                <p>Wind: {weather !== null && weather.wind.speed} m/s </p>
            </>
        )
}

export default Weather ;