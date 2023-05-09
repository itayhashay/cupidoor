import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const MIN_DISTANCE = 10;
const MIN_METER = 10;
const MAX_METER = 350;
const STEP = 5;

const marks = [
    {
      value: MIN_METER,
      label: MIN_METER,
    },
    {
      value: MAX_METER,
      label: MAX_METER,
    },
  ];

const SquareMeterRangeSlider = () => {
    const [value, setValue] = useState<number[]>([MIN_METER, MAX_METER]);

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
        min={MIN_METER}
        max={MAX_METER}
        marks={marks}
      />
    </Box>
  );
}

export default SquareMeterRangeSlider;