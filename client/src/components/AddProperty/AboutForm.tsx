import { Box, Checkbox, Divider, FormControlLabel, Grid, InputAdornment, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { PROPERTY_CONDITIONS } from "../../utils/properyConditions";
import { generateArrayFromRange } from "../../utils/logic";
import TextareaAutosize from '@mui/base/TextareaAutosize';

type CheckboxProps = {
    key: string;
    display: string;
    value: boolean;
}

const CHECKBOXES_DEFAULT: CheckboxProps[] = [
    {
      key: "accessible",
      display: "Accessible",
      value: false,
    },
    {
      key: "boiler",
      display: "Boiler",
      value: false,
    },
    {
      key: "furnished",
      display: "Furnished",
      value: false,
    },
    {
      key: "airConditioner",
      display: "A/C",
      value: false,
    },
    {
      key: "bars",
      display: "Bars",
      value: false,
    },
    {
      key: "elevator",
      display: "Elevator",
      value: false,
    },
    {
      key: "garage",
      display: "Garage",
      value: false,
    },
    {
      key: "longTerm",
      display: "Long Term",
      value: false,
    },
    {
      key: "shelter",
      display: "Shelter",
      value: false,
    },
  ];
  
const AboutForm = ({activeStep, saveChangesOnNext} : {activeStep?: number, saveChangesOnNext?: (values: any) => void}) => {
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [roomsValue, setRoomsValue] = useState<number>();
    const [floorValue, setFloorValue] = useState<number>();
    const [balconyValue, setBalconyValue] = useState<number>();
    const [parkingValue, setParkingValue] = useState<number>();
    const [checkboxesValues, setCheckboxesValues] = useState<CheckboxProps[]>(CHECKBOXES_DEFAULT);
    const conditionRef = useRef();
    const areaRef = useRef();

    useEffect(() => {
        console.log(activeStep)
        console.log("STEP CHANGE ABOUT")
    }, [activeStep]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = checkboxesValues.findIndex((checkbox: CheckboxProps) => checkbox.key === event.target.id);

        if (index !== -1) {
        const newData = [...checkboxesValues];
        newData[index] = { ...newData[index], value: event.target.checked };
        setCheckboxesValues(newData);
        }
    };

    return (
        <Box width="100%" display="flex" flexDirection="column" justifyContent="space-between" padding="0 24px">
            <Box height="45%" display="flex" flexDirection="row" justifyContent="space-between" marginBottom="16px">
                <Box display="flex" flexDirection="column" width="48%">
                    <Typography variant="body1" fontWeight={700} marginBottom="5px">Property Condition</Typography>
                    <TextField
                        inputRef={conditionRef}
                        select
                        required
                        sx={{width: '-webkit-fill-available'}}
                        >
                        {Object.values(PROPERTY_CONDITIONS).map((option, index) => (
                            <MenuItem key={index} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Typography variant="body1" fontWeight={700} marginTop="16px">House area (in square meters)</Typography>
                    <TextField
                        inputRef={areaRef}
                        sx={{ width: '-webkit-fill-available', marginBottom: "16px" }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">m²</InputAdornment>,
                        }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" width="48%">
                    <Typography variant="body1" fontWeight={700} marginBottom="5px">Description</Typography>
                    <TextareaAutosize 
                        value={descriptionValue} 
                        onChange={(e) => setDescriptionValue(e.target.value)} 
                        minRows={7.5} 
                        style={{resize: "none", padding: "12px", fontSize: "14px", fontFamily:"'Roboto'", wordSpacing: 1.5, borderRadius: "4px", border: "1px solid #c4c4c4"}} 
                        placeholder="Describe your property, the condition of the furnishings, the frequency of maintenance, etc."/>
                </Box>
            </Box>
            <Box height="45%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                <Box width="48%" display="flex" flexDirection="row" justifyContent="space-between">
                    <Box display="flex" flexDirection="column" marginRight="2rem" width="48%">
                        <Box display="flex" flexDirection="column" marginBottom="1rem">
                            <Typography variant="body1" fontWeight={700} marginBottom="5px">Balcony</Typography>
                                <ToggleButtonGroup size="small"
                                    sx={{border: "0.5px solid #c4c4c4", width:"fit-content"}}
                                    color="primary"
                                    exclusive
                                    value={balconyValue}
                                    onChange={(e, value) => setBalconyValue(value)} 
                                    >
                                    {generateArrayFromRange(0, 5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                                </ToggleButtonGroup>
                        </Box>
                        <Box display="flex" flexDirection="column">
                            <Typography variant="body1" fontWeight={700} marginBottom="5px">Parking Spots</Typography>
                            <ToggleButtonGroup size="small"
                                sx={{border: "0.5px solid #c4c4c4", width:"fit-content"}}
                                color="primary"
                                exclusive
                                value={parkingValue}
                                onChange={(e, value) => setParkingValue(value)} 
                                >
                                {generateArrayFromRange(0, 5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                        <Box display="flex" flexDirection="column" width="48%">
                            <Box display="flex" flexDirection="column" marginBottom="1rem">
                                <Typography variant="body1" fontWeight={700} marginBottom="5px">Rooms</Typography>
                                <ToggleButtonGroup size="small"
                                    sx={{maxWidth: "calc(100% - 2vh)", overflowY: "auto", border: "0.5px solid #c4c4c4"}}
                                    color="primary"
                                    exclusive
                                    value={roomsValue}
                                    onChange={(e, value) => setRoomsValue(value)} 
                                    >
                                    {generateArrayFromRange(1, 10, 0.5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                                </ToggleButtonGroup>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="body1" fontWeight={700} marginBottom="5px">Floor</Typography>
                                <ToggleButtonGroup size="small"
                                    sx={{maxWidth: "calc(100% - 2vh)", overflowY: "auto", border: "0.5px solid #c4c4c4"}}
                                    color="primary"
                                    exclusive
                                    value={floorValue}
                                    onChange={(e, value) => setFloorValue(value)} 
                                    >
                                    {generateArrayFromRange(-1, 20).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                                </ToggleButtonGroup>
                            </Box>
                        </Box>
                </Box>
                <Divider orientation="vertical"/>
                <Box width="48%" display="flex" flexDirection="row">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {checkboxesValues.map((checkboxesProp, index) => (
                                <Grid item xs={2} sm={4} md={4} key={index}>
                                    <FormControlLabel sx={{ "& .MuiFormControlLabel-label": { fontSize: "14px" } }} control={<Checkbox size="small" id={checkboxesProp.key} checked={checkboxesProp.value} onChange={handleChange}/>} label={checkboxesProp.display} />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
 
export default AboutForm;