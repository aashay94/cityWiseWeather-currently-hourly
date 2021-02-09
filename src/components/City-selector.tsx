import React from "react";
import {
  Select,
  InputLabel,
  MenuItem,
  makeStyles,
  createStyles,
  Theme,
  FormControl,
} from "@material-ui/core";
import { City } from "../models/city";

const CitySelector: React.FunctionComponent<{
  cities: City[];
  initialCityId: string;
  onCityChange: (city: City) => void;
}> = ({ cities, initialCityId, onCityChange }) => {
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        minWidth: 300,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      select: {
        width: '100%',
        marginBottom: 10,
        fontSize: 20
      }
    })
  );

  const [currentCityId, setCurrentCityId] = React.useState(initialCityId);
  const cityItems = cities.map((city: City) => (
    <MenuItem key={city.id} value={city.id}>
      {city.name}
    </MenuItem>
  ));
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCurrentCityId(event.target.value as string);
    const selectedCity: City = cities.find(
      (x) => x.id === event.target.value 
    );
    onCityChange(selectedCity);
  };

  return (
    <div>
      <FormControl className={classes.formControl} fullWidth={true}>
        <InputLabel id="demo-simple-select-label">Select City</InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentCityId}
          onChange={handleChange}
        >
          {cityItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default CitySelector;
