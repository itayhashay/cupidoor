import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateField } from "@mui/x-date-pickers";
import { useState } from "react";
import { Dayjs } from "dayjs";

const BirthdayPicker = () => {
  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DateField", "DateField"]}
        sx={{
          width: "100%",
          margin: "8px 0",
          paddingTop: 0,
          overflow: "visible",
        }}
      >
        <DateField
          id="field"
          label="Date Of Birth"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          fullWidth={true}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BirthdayPicker;
