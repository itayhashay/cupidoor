import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const AddressForm = ({activeStep, saveChangesOnNext} : {activeStep?: number, saveChangesOnNext?: (values: any) => void}) => {
    const houseNumberRef = useRef();
    const cityRef = useRef();
    const streetRef = useRef();

    useEffect(() => {
        console.log(activeStep)
        console.log("STEP CHANGE ADDRESS")
    }, [activeStep]);

    return (
        <Box width="50%" display="flex" flexDirection="column" padding="0 24px">
            <Box display="flex" flexDirection="column">
                <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">City</Typography>
                    <TextField
                        required
                        focused
                        inputRef={cityRef}
                        />
            </Box>
            <Box display="flex" flexDirection="column">
                <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Street</Typography>
                                <TextField
                required
                inputRef={streetRef}
                />

            </Box>
            <Box display="flex" flexDirection="column">
                <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">House Number</Typography>
                    <TextField
                        inputRef={houseNumberRef}
                        required
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}                  
                        sx={{ width: '-webkit-fill-available', marginBottom: "8px" }}
                    />
            </Box>
        </Box>
    );
}
 
export default AddressForm;