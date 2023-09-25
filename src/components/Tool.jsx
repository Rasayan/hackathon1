import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import air from '../../api/air'

// import Pollution from "./Pollution";
import './Tool.css'

const Tool = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      setCurrent(data.data.current);
    }
  }, [data]);

  const goBack = () => {
    navigate("/hackathon1")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchArray = searchTerm.split(',');

    try {
      const response = await fetch(`http://api.airvisual.com/v2/city?city=${searchArray[0]}&state=${searchArray[1]}&country=${searchArray[2]}&key=fa7046f5-770c-4f4f-916c-63f40545affd`);
      const data = await response.json();
      console.log(data);
      setError(null);

      if (data) {
        setData(data);  
        console.log(data);
        console.log(data.data.current);
        setCurrent(data.data.current);
      } else {
        setError('City not found');
        setData(null);
        setCurrent(null);
      }
      
    } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data');
        setData(null);
        setCurrent(null);
    }  
  };


    return (
        <section className="toolSection">
            <div className="toolForm">
                <form action="" className="form" onSubmit={handleSubmit}>
                    <input
                    type="text" 
                    id="toolFormInput" 
                    name="formInput"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter City with format (City,State,Country" />
                    <button id="toolFormButt">Search</button>
                </form>

                <button 
                id="goBackButt" 
                onClick={goBack}>
                    Go Back
                    </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="details">
                {data && (
                    <span id="cityDetails">
                        <h2>{data.data.city}</h2>
                        <h3>{data.data.state}&nbsp;{data.data.country}</h3>
                    </span>
                )}
                <hr />
                {current && (
                    <span id="airQuality" >
                        <div>
                        <div className="custom-loader">
                        </div>
                        <h2 id="aqiusAir">{current.pollution.aqius}</h2>
                        </div>

                        <span className="weatherDet">
                            <h2>Temp : {current.weather.tp} degC</h2>
                            <h2>Pressure : {current.weather.pr} hPa</h2>
                            <h2>Humidity : {current.weather.hu} gm^3</h2>
                            <h2>Wind Speed : {current.weather.ws} kmph</h2>
                        </span>
                    </span>
                )}
                <hr />
            </div>
        </section>
    )
}

export default Tool