import React from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { CurrentWeatherData } from "../models/current-weather";

const CurrentWeather: React.FunctionComponent<{
    currentWeatherData: CurrentWeatherData;
}> = ({ currentWeatherData }) => {
    if (currentWeatherData != null) {
        /*
            Flattening the Object here and converting it to an array of objects, would be easier to iterate over it
        */
        var flattenObject = (currentWeatherData) => {
            const array = Array.isArray(currentWeatherData) ? currentWeatherData : [currentWeatherData];
            return array.reduce((acc, value) => {
                acc.push(value);
                if (value.children) {
                    acc = acc.concat(flattenObject(value.children));
                    delete value.children;
                }
                return acc;
            }, []);
        }
        var res = flattenObject(currentWeatherData);
        /*
            Iterating over the Flattened Object here and displaying all the data
        */
        var currentWeatherDisp = res.map(resData => (
            <div>
                {/* Making use of grid layout to make the data more presentable, divided the columns and displaying according */}
                <Grid container spacing={0}>
                    <Grid item xs={1}>
                        <Typography variant="body1">
                            {resData["weather"].map(weather => (
                                /*
                                    Displaying the weather icon
                                */
                                <img
                                    src={`http://openweathermap.org/img/w/${weather["icon"]}.png`}
                                    alt="weather icon"
                                    width="100"
                                    height="100"
                                />
                            ))
                            }
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                                    {/* Making use of font-awesome to display appropriate fonts */}
                                    <i className="fas fa-thermometer-three-quarters"></i> Temperature:{" "}
                                    {/* Displaying the temperature*/}
                                    <span>{resData["main"].temp}&deg;{"C"}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                                {"Feels Like: "}
                                <span>{resData["main"].feels_like}&deg;{"C"}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1">
                                    {/* Displaying the min/max temperature*/}
                                    <i className="fas fa-sort"></i> Min/Max:{" "}
                                    <span>
                                        {resData["main"].temp_min}&deg;{"C"} | {" "}
                                        {resData["main"].temp_max}&deg;{"C"}
                                    </span>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                                <i className="fas fa-water"></i> Humidity:{" "}
                                <span>{resData["main"].humidity}%</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                                <i className="fas fa-tachometer-alt"></i> Pressure:{" "}
                                <span>{resData["main"].pressure} hPa</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                                <i className="fas fa-eye"></i> Visibility:{" "}
                                <span>{resData["visibility"]}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                                <i className="fas fa-cloud"></i> Cloud Percentage:{" "}
                                <span>{resData["clouds"].all}%</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1">
                                <i className="fas fa-wind"></i> Wind Speed:{" "}
                                <span>{resData["wind"].speed}{" meter/sec "}{resData["wind"].deg}&deg;</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="body1">
                            {resData["weather"].map(weather => (
                                <span>
                                    {" "}
                                    <i className="fas fa-info"></i> Description: {" "}
                                    <span>{weather["description"]}</span>
                                </span>
                            ))
                            }
                        </Typography>
                    </Grid>

                </Grid>
            </div>
        ));
    }

    const useStyles = makeStyles({
        root: {
            minWidth: 300,
        }
    });

    const classes = useStyles();

    return (
        <Card variant="outlined" className={classes.root}>
            <CardContent>
                {currentWeatherDisp}
            </CardContent>
        </Card>
    );
};

export default CurrentWeather;