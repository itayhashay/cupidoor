import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const MIN_DISTANCE = 0;
const MIN_PARKING = 0;
const MAX_PARKING = 5;
const STEP = 1;

const marks = [
    {
      value: MIN_PARKING,
      label: MIN_PARKING,
    },
    {
      value: MAX_PARKING,
      label: MAX_PARKING,
    },
  ];

const ParkingRangeSlider = () => {
    const [value, setValue] = useState<number[]>([MIN_PARKING, MAX_PARKING]);

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
        min={MIN_PARKING}
        max={MAX_PARKING}
        marks={marks}
      />
    </Box>
  );
}

export default ParkingRangeSlider;