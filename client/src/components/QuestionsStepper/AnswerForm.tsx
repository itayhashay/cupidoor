import Radio from "@mui/material/Radio/Radio";
import FormControl from "@mui/material/FormControl/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormLabel from "@mui/material/FormLabel/FormLabel";
import { ANSWERS_MAP, FormProps, QUESTIONS } from "./constant";
import { useEffect, useState } from "react";

const AnswerForm = ({ activeStep, setAnswer, value }: FormProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number>(value);

  useEffect(() => {
    setSelectedAnswer(value);
  }, [activeStep, value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(activeStep, ANSWERS_MAP[event.target.value]);
  };

  return (
    <FormControl
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <FormLabel
        sx={{ fontSize: "30px", fontWeight: "bold" }}
        id="demo-radio-buttons-group-label"
      >
        {QUESTIONS[activeStep]}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="yes"
          control={
            <Radio
              color="success"
              checked={selectedAnswer === ANSWERS_MAP["yes"]}
              onChange={handleChange}
            />
          }
          label="Yes"
        />
        <FormControlLabel
          value="no"
          control={
            <Radio
              color="error"
              checked={selectedAnswer === ANSWERS_MAP["no"]}
              onChange={handleChange}
            />
          }
          label="No"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default AnswerForm;
