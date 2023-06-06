import { Box, InputAdornment, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { PROPERTY_CONDITIONS } from "../../utils/properyConditions";
import { generateArrayFromRange } from "../../utils/logic";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const AboutForm = () => {
    const [descriptionValue, setDescriptionValue] = useState<string>("");
    const [roomsValue, setRoomsValue] = useState<number>();
    const [floorValue, setFloorValue] = useState<number>();
    const [balconyValue, setBalconyValue] = useState<number>();
    const [parkingValue, setParkingValue] = useState<number>();

    const conditionRef = useRef();
    const areaRef = useRef();
    
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
            <Box height="45%" display="flex" flexDirection="row" justifyContent="space-between">
            <Box display="flex" flexDirection="column" marginRight="2rem">
                <Box display="flex" flexDirection="column" marginBottom="1rem">
                    <Typography variant="body1" fontWeight={700} marginBottom="5px">Balcony</Typography>
                        <ToggleButtonGroup size="small"
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
                            color="primary"
                            exclusive
                            value={parkingValue}
                            onChange={(e, value) => setParkingValue(value)} 
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
                            value={roomsValue}
                            onChange={(e, value) => setRoomsValue(value)} 
                            >
                            {generateArrayFromRange(1, 10, 0.5).map(number => <ToggleButton value={number}>{number}</ToggleButton>)}
                        </ToggleButtonGroup>
                    </Box>
                    <Box display="flex" flexDirection="column">
                        <Typography variant="body1" fontWeight={700} marginBottom="5px">Floor</Typography>
                        <ToggleButtonGroup size="small"
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
        </Box>
    );
}
 
export default AboutForm;