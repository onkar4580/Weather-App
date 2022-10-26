import React from 'react'
import { useState, useEffect} from 'react'
import '../index.css'
import WeatherCard from './WeatherCard';

function Temp() {

    const [searchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({});

    const getWeatherInfo = async () => {
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid={enter your api key here}`;
            const res = await fetch(url);
            const data = await res.json();

            const { temp, humidity , pressure} = data.main;
            const { main:weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country , sunset } = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };

            setTempInfo(myNewWeatherInfo);
            console.log(temp);
            console.log(weathermood);
            //console.log(data);

        } catch(error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getWeatherInfo();
    },[])
  return (
    <>
        <div className='wrap'>
            <div className='search'>
                <input 
                    type='search'
                    placeholder='search...'
                    autoFocus
                    id='search'
                    className='searchTerm'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
            </div>
        </div>
        {/* weather card */}
        <WeatherCard tempInfo = { tempInfo }/>
    </>
  )
}

export default Temp
