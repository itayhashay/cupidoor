import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const MIN_DISTANCE = 0;
const MIN_FLOOR = -1;
const MAX_FLOOR = 20;
const STEP = 1;

const marks = [
    {
      value: MIN_FLOOR,
      label: MIN_FLOOR,
    },
    {
      value: MAX_FLOOR,
      label: MAX_FLOOR,
    },
  ];

const FloorRangeSlider = () => {
    const [value, setValue] = useState<number[]>([MIN_FLOOR, MAX_FLOOR]);

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
        min={MIN_FLOOR}
        max={MAX_FLOOR}
        marks={marks}
      />
    </Box>
  );
}

export default FloorRangeSlider;