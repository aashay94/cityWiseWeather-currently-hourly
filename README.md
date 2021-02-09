# Weather Forecast Project

## DEMO ( https://calm-dusk-84892.herokuapp.com/)

You use either yarn or npm as your package manager for the project

Run either

```
npm install
```

or

```
yarn install
```

## Requirements

The objective of the assignment is to display weather data for a selection of cities using React components. The project contains a starting point to help you 
and the main focus is around displaying the data. 
The project uses the [OpenWeather](https://openweathermap.org/api) free API to enable fetching of the data for a selected city.


* Selection of a city name from a populated drop down
* Fetching weather data from [OpenWeather](https://openweathermap.org/api) for the selected city in 2 formats
    * Current weather data [see OpenWeather api docs for details](https://openweathermap.org/current)
    * Hourly weather data (3 hour intervals) [see OpenWeather api docs for details](https://openweathermap.org/forecast5)
* Display the weather data in the 2 formats outlined above
* Add support for some additional cities to display weather data
    * Paris (2968815)
    * Madrid (3117735)
    * Chicago (4887398)
    * Moscow (524894)

### Project Info

* [City Selector component](src/components/City-selector.tsx)
* [Main Weather Forecast component](src/components/Weather-forecast.tsx)
* [City data](src/constants/city-constants.ts)


## Notes

* The project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* The project uses TypeScript. If you are not familar with TypeScript do not worry, you should be able to do what you need to do as if you were working on a JS project. Just note that the .js/.jsx files are now .ts/.tsx.
* Scripts are provided for build, start and test.
* The project includes and uses the [Material UI library](https://material-ui.com/). Feel free to use this to add any additional UI components you need to display the weather data.
* React functional components and hooks have been used for the initial setup.