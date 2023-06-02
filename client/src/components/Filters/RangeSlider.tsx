import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { SyntheticEvent, useEffect, useState } from 'react';
import { SliderProps } from '../../types/filters';
import { Grid, Typography } from '@mui/material';
import { VolumeUp } from '@mui/icons-material';

const RangeSlider = ({
    filterName,
    minDistance,
    minValue,
    maxValue,
    step,
    commitFilter,
    filterValue,
    icon
}: SliderProps) => {
    const [value, setValue] = useState<number[]>([minValue, maxValue]);

    useEffect(()=>{
      setValue(filterValue !== undefined ? filterValue : [minValue, maxValue])
    }, [filterValue])

    const conmmitChange = (event: Event | SyntheticEvent<Element, Event>, newValue: number | number[]) => {
        if(Array.isArray(newValue) && newValue.length === 2 && commitFilter) {
            const isChangeHasMade = (newValue[0] !== minValue || newValue[1] !== maxValue);
            
            if(isChangeHasMade) {
                commitFilter(filterName, newValue);    
            } else {
                commitFilter(filterName, null);    
            }
        } else {
            throw new Error("Slider Error: " + filterName);
        }
    }

    const handleChange = (
      event: Event,
      newValue: number | number[],
      activeThumb: number,
    ) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      }
    };

    return (
    <Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
        {icon ? <img alt="" src={icon} style={{ height: "20px", width: "20px" }}/> : <VolumeUp /> }
        </Grid>
        <Grid item xs>
          <Slider
          size="small"
          value={value}
          onChange={handleChange}
          onChangeCommitted={conmmitChange}
          valueLabelDisplay="auto"
          disableSwap
          step={step}
          min={minValue}
          max={maxValue}
        />
        </Grid>
        <Grid item sx={{ width: "85px"}} display="flex" justifyContent="space-between">
          <Typography>
            {value[0]}
          </Typography>
          <Typography>
            -
          </Typography>
          <Typography>
            {value[1]}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RangeSlider;