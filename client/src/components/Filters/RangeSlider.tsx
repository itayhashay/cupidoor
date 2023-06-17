import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SyntheticEvent, useEffect, useState } from "react";
import { SliderProps } from "../../types/filters";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { VolumeUp } from "@mui/icons-material";

const RangeSlider = ({
  displayName,
  filterName,
  minDistance,
  minValue,
  maxValue,
  step,
  commitFilter,
  filterValue,
  icon,
}: SliderProps) => {
  const [value, setValue] = useState<number[]>([minValue, maxValue]);

  useEffect(() => {
    setValue(filterValue !== undefined ? filterValue : [minValue, maxValue]);
  }, [filterValue]);

  const conmmitChange = (
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    if (Array.isArray(newValue) && newValue.length === 2 && commitFilter) {
      const isChangeHasMade =
        newValue[0] !== minValue || newValue[1] !== maxValue;

      if (isChangeHasMade) {
        commitFilter(filterName, newValue);
      } else {
        commitFilter(filterName, null);
      }
    } else {
      throw new Error("Slider Error: " + filterName);
    }
  };

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
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
      <Box>
        <Typography gutterBottom fontWeight={"bold"}>
          {displayName}
        </Typography>
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
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        <TextField
          variant={"filled"}
          hiddenLabel
          value={value[0]}
          size="small"
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            style: { fontSize: 12, fontWeight: "bold" },
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        <TextField
          hiddenLabel
          variant={"filled"}
          value={value[1]}
          size="small"
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            style: { fontSize: 12, fontWeight: "bold" },
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </Box>
    </Box>
  );
};

export default RangeSlider;
