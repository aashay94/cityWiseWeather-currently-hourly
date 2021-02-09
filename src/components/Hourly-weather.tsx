import React from "react";
import {
    makeStyles,
    createStyles,
    Theme,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Collapse
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { HourlyWeatherData } from "../models/hourly-weather";
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expand: {
            transform: 'rotate(180deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(0deg)',
        }
    }),
);

const HourlyWeather: React.FunctionComponent<{
    hourlyWeatherData: HourlyWeatherData;
}> = ({ hourlyWeatherData }) => {
    const classes = useStyles();
    const [expandedId, setExpandedId] = React.useState(-1);

    const handleExpandClick = (i) => {
        setExpandedId(expandedId === i ? -1 : i);
    };
    if (hourlyWeatherData != null) {
        /*
            Flattening the Object here and converting it to an array of objects, would be easier to iterate over it
        */
        var flattenObject = (hourlyWeatherData) => {
            const array = Array.isArray(hourlyWeatherData) ? hourlyWeatherData : [hourlyWeatherData];
            return array.reduce((acc, value) => {
                acc.push(value);
                if (value.children) {
                    acc = acc.concat(flattenObject(value.children));
                    delete value.children;
                }
                return acc;
            }, []);
        }
        var res = flattenObject(hourlyWeatherData);
        var hourlyWeatherDisp = res.map(resData => (
            <Grid container spacing={1}>
                {resData["list"].map((list, i) => (
                    // Divided the columns using grid layout, further making use of cards to display hourly data
                    <Grid item xs={3}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="body1">
                                    {/* Displaying the weather icon*/}
                                    {list["weather"].map(weather => (
                                        <img
                                            src={`http://openweathermap.org/img/w/${weather["icon"]}.png`}
                                            alt="weather icon"
                                            width="100"
                                            height="100"
                                        />
                                    ))
                                    }
                                    <p>
                                        {" "}
                                        {/* Making use of font-awesome to display appropriate icons*/}
                                        <i className="fas fa-clock"></i> Date/Time:{" "}
                                        <span>{list["dt_txt"]}</span>
                                    </p>

                                    {list["main"].temp && (
                                        <p>
                                            {" "}
                                            <i className="fas fa-thermometer-three-quarters"></i> Temperature:{" "}
                                            <span>{list["main"].temp}&deg;{"C"}</span>
                                        </p>
                                    )}
                                    {list["main"].feels_like && (
                                        <p>
                                            {"Feels Like: "}
                                            <span>{list["main"].feels_like}&deg;{"C"}</span>
                                        </p>
                                    )}
                                    {list["main"].temp_min && list["main"].temp_max && (
                                        <p>
                                            {" "}
                                            <i className="fas fa-sort"></i> Min/Max:{" "}
                                            <span>
                                                {list["main"].temp_min}&deg;{"C"} | {" "}
                                                {list["main"].temp_max}&deg;{"C"}
                                            </span>
                                        </p>
                                    )}
                                </Typography>
                            </CardContent>
                            {/* Added the logic for clicking the expand button here, which expand you click, 
                            that particular card would be expanded */}
                            <CardActions disableSpacing>
                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expandedId,
                                    })}
                                    onClick={() => handleExpandClick(i)}
                                    aria-expanded={expandedId === i}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            {/* Added a collapse feature in card, main purpose here is to display minimum details initially
                                Once you expand it, you will see the remaining details like Humidity, Pressure, Visibility etc  */}
                            <Collapse in={expandedId === i} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography variant="body1">
                                        {list["main"].humidity && (
                                            <p>
                                                {" "}
                                                <i className="fas fa-water"></i> Humidity:{" "}
                                                <span>{list["main"].humidity}%</span>
                                            </p>
                                        )}
                                        {list["main"].pressure && (
                                            <p>
                                                {" "}
                                                <i className="fas fa-tachometer-alt"></i> Pressure:{" "}
                                                <span>{list["main"].pressure} hPa</span>
                                            </p>
                                        )}
                                        {list["visibility"] && (
                                            <p>
                                                {" "}
                                                <i className="fas fa-eye"></i> Visibility:{" "}
                                                <span>{list["visibility"]}</span>
                                            </p>
                                        )}
                                        {list["clouds"].all && (
                                            <p>
                                                {" "}
                                                <i className="fas fa-cloud"></i> Cloud Percentage:{" "}
                                                <span>{list["clouds"].all}%</span>
                                            </p>
                                        )}
                                        {list["wind"].speed && (
                                            <p>
                                                {" "}
                                                <i className="fas fa-wind"></i> Wind Speed:{" "}
                                                <span>{list["wind"].speed}{" meter/sec "}{list["wind"].deg}&deg;</span>
                                            </p>
                                        )}
                                        {list["weather"].map(weather => (
                                            <p>
                                                {" "}
                                                <i className="fas fa-info"></i> Description: {" "}
                                                <span>{weather["description"]}</span>
                                            </p>
                                        ))
                                        }
                                    </Typography>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                ))
                }
            </Grid>
        ));
    }
    return (
        <div>
            {hourlyWeatherDisp}
        </div>
    );
};

export default HourlyWeather;