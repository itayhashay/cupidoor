import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const MIN_DISTANCE = 5;
const MIN_PRICE = 0;
const MAX_PRICE = 100;
const STEP = 5;

const marks = [
    {
      value: MIN_PRICE,
      label: MIN_PRICE,
    },
    {
      value: MAX_PRICE,
      label: MAX_PRICE,
    },
  ];

const PrecentRangeSlider = () => {
    const [value, setValue] = useState<number[]>([MIN_PRICE, MAX_PRICE]);

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
        valueLabelFormat={(value) => `${value}%`}
        disableSwap
        step={STEP}
        min={MIN_PRICE}
        max={MAX_PRICE}
        marks={marks}
      />
    </Box>
  );
}

export default PrecentRangeSlider;