import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const MIN_DISTANCE = 0;
const MIN_BALCONY = 0;
const MAX_BALCONY = 5;
const STEP = 1;

const marks = [
    {
      value: MIN_BALCONY,
      label: MIN_BALCONY,
    },
    {
      value: MAX_BALCONY,
      label: MAX_BALCONY,
    },
  ];

const BalconyRangeSlider = () => {
    const [value, setValue] = useState<number[]>([MIN_BALCONY, MAX_BALCONY]);

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
        min={MIN_BALCONY}
        max={MAX_BALCONY}
        marks={marks}
      />
    </Box>
  );
}

export default BalconyRangeSlider;