import React from "react";
import { Typography, Card, CardContent, CardHeader } from "@material-ui/core";
import { City } from "../models/city";
import CitySelector from "./City-selector";
import CurrentWeather from "./Current-weather";
import HourlyWeather from "./Hourly-weather";
import {
  getCurrentWeatherForCity,
  getHourlyWeatherForCity,
} from "../api/weather-api";
import { CurrentWeatherData } from "../models/current-weather";
import { cities } from "../constants/city-constants";
import { HourlyWeatherData } from "../models/hourly-weather";
import { makeStyles } from '@material-ui/core/styles';

const WeatherForecast: React.FunctionComponent = () => {
  const [city, setCity] = React.useState<City>(cities[0]);
  const [
    currentWeather,
    setCurrentWeather,
  ] = React.useState<CurrentWeatherData>(null);

  const [hourlyWeather, setHourlyWeather] = React.useState<HourlyWeatherData>(
    null
  );

  const onCityChange = (city: City) => {
    setCity(city);
  };

  React.useEffect(() => {
    const loadWeather = async () => {
      await Promise.all([
        getCurrentWeatherForCity(city),
        getHourlyWeatherForCity(city),
      ]).then((results: [CurrentWeatherData, HourlyWeatherData]) => {
        const [current, hourly] = results;
        setCurrentWeather(current);
        setHourlyWeather(hourly);
      });
    };

    if (city) {
      loadWeather();
    }
  }, [city]);

  const useStyles = makeStyles({
    root: {
      minWidth: 300,
      margin: 2,
      background: 'rgba(61, 78, 174, 0.97)',
      color: 'white'
    },
    pos: {
      marginBottom: 2,
    },
    header:{
      color: 'white'
    }
  });

  const classes = useStyles();

  return (
    <div>
      {/* 
        Normal Header, would change depending on the city selected
      */}
      <Typography variant="h5" gutterBottom align="center" className={classes.root}>
        {(city && `Displaying Weather Information for ${city.name}`) ||
          `Select a City to View Weather Information`}
      </Typography>
      {/* 
        Dropdown component consisting of all the cities
      */}
      <CitySelector
        cities={cities}
        initialCityId={city.id.toString()}
        onCityChange={onCityChange}
      />
      {/* 
        Making use of Card here, this component would display the current weather
      */}
      <Card className={classes.root} variant="outlined">
        <CardHeader title="Current Weather" align="center" className={classes.header}></CardHeader>
        <CardContent>
          <CurrentWeather
            currentWeatherData={currentWeather}
          />
        </CardContent>
      </Card>
      {/* 
        Making use of Card here, this component would display the hourly weather
      */}
      <Card className={classes.root} variant="outlined">
        <CardHeader title="Hourly Weather" align="center" className={classes.header}></CardHeader>
        <CardContent>
          <HourlyWeather
            hourlyWeatherData={hourlyWeather}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecast;
