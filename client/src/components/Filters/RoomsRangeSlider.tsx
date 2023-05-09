import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const MIN_DISTANCE = 0;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const STEP = 0.5;

const marks = [
    {
      value: MIN_ROOMS,
      label: MIN_ROOMS,
    },
    {
      value: MAX_ROOMS,
      label: MAX_ROOMS,
    },
  ];

const RoomsRangeSlider = () => {
    const [value, setValue] = useState<number[]>([MIN_ROOMS, MAX_ROOMS]);

    const handleChange = (
      event: Event,
      newValue: number | number[],
      activeThumb: number,
    ) => {
      if (!Array.isArray(newValue)) {
        return;
      }
  
      if (activeThumb === 0) {
        setValue([Math.min(newValue[0], value[1] - MIN_DISTANCE), value[1]]);
      } else {
        setValue([value[0], Math.max(newValue[1], value[0] + MIN_DISTANCE)]);
      }
    };
          
    return (
    <Box>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        disableSwap
        step={STEP}
        min={MIN_ROOMS}
        max={MAX_ROOMS}
        marks={marks}
      />
    </Box>
  );
}

export default RoomsRangeSlider;