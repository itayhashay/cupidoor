import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { CheckBoxFilter } from "../../types/filters";
import { FiltersStateType } from "../Sidebar";

const CheckBoxFilters = ({ filters,values,commitFilter }: { filters: CheckBoxFilter[],values:FiltersStateType,commitFilter:Function }) => {
    const handleChange = (event:any,filterName:string)=>{
        const value = event.target.checked === true ? true : null;
        commitFilter(filterName,value);
    }
  return (
    <Box padding={2}>
      <Typography variant="subtitle2" fontSize={"1em"} mb={1}>
        Property Features
      </Typography>
      <Grid container>
        {filters.map((feature) => {
          return (
            <Grid item xs={6} key={feature.filterName}>
              <FormControlLabel
                control={<Checkbox checked={values[feature.filterName] as boolean}></Checkbox>}
                label={feature.displayName}
                onChange={(event)=>handleChange(event,feature.filterName)}
              ></FormControlLabel>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CheckBoxFilters;