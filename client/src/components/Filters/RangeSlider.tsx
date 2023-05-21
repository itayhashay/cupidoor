import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { SliderProps } from '../../types/filters';

const RangeSlider = ({
    filterName,
    minDistance,
    minValue,
    maxValue,
    step,
    commitFilter,
    filterValue
}: SliderProps) => {
    const [value, setValue] = useState<number[]>([minValue, maxValue]);
    const marks = useMemo(()=>{
        return [
            {
              value: minValue,
              label: minValue,
            },
            {
              value: maxValue,
              label: maxValue,
            },
          ]
    }, [maxValue, minValue]);

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
    console.log(filterName);
    console.log(value);
    console.log("-----------------");

    return (
    <Box>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={conmmitChange}
        valueLabelDisplay="auto"
        disableSwap
        step={step}
        min={minValue}
        max={maxValue}
        marks={marks}
      />
    </Box>
  );
}

export default RangeSlider;