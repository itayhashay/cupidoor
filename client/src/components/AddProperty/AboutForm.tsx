import { Box, InputAdornment, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { PROPERTY_CONDITIONS } from "../../utils/properyConditions";
import { generateArrayFromRange } from "../../utils/logic";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const AboutForm = () => {
  
    const conditionRef = useRef();
    const areaRef = useRef();
    const roomsRef = useRef();
    const floorRef = useRef();
    const balconyRef = useRef();
    const ParkingsRef = useRef();
    const descriptionRef = useRef();

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
                    <Typography variant="h6" fontWeight={400} marginBottom="5px">Description</Typography>
                    <TextareaAutosize minRows={7} style={{resize: "none", padding: "12px", fontSize: "14px", fontFamily:"'Roboto'", wordSpacing: 1.5}} placeholder="Describe your property, the condition of the furnishings, the frequency of maintenance, etc."/>
                </Box>
            </Box>
            <Box height="45%" display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="column" marginRight="2rem">
                <Box display="flex" flexDirection="column" marginBottom="1rem">
                    <Typography variant="body1" fontWeight={700} marginBottom="5px">Balcony</Typography>
                        <ToggleButtonGroup size="small"
                            color="primary"
                            exclusive
                            ref={balconyRef}
                            >
                            {generateArrayFromRange(0, 5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="body1" fontWeight={700} marginBottom="5px">Parking Spots</Typography>
                        <ToggleButtonGroup size="small"
                            color="primary"
                            exclusive
                            ref={ParkingsRef}
                            >
                            {generateArrayFromRange(0, 5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" marginBottom="1rem">
                        <Typography variant="body1" fontWeight={700} marginBottom="5px">Rooms</Typography>
                        <ToggleButtonGroup size="small"
                            color="primary"
                            exclusive
                            ref={roomsRef}
                            >
                            {generateArrayFromRange(1, 10, 0.5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="body1" fontWeight={700} marginBottom="5px">Floor</Typography>
                        <ToggleButtonGroup size="small"
                            color="primary"
                            exclusive
                            ref={floorRef}
                            >
                            {generateArrayFromRange(-1, 20).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
 
export default AboutForm;