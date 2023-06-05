import { Box, Grid, TextField } from "@mui/material";
import { useRef, useState } from "react";

const AddressForm = () => {
    const [cities, setCities] = useState();
    const [streets, setStreets] = useState();

    const cityRef = useRef();
    const streetRef = useRef();
    const houseNumberRef = useRef();


    return (
        <Box width="50%" display="flex" flexDirection="row">
            <TextField
                required
                label="City"
                autoFocus
                inputRef={cityRef}
                />
            <TextField
                sx={{ marginLeft: "1rem" }}
                required
                label="Street"
                inputRef={streetRef}
                />
            <TextField
                sx={{ marginLeft: "1rem" }}
                required
                label="House Number"
                inputRef={houseNumberRef}
                />
        </Box>
    );
}
 
export default AddressForm;