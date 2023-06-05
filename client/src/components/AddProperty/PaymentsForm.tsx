import { Box, FormControl, Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { generateArrayFromRange } from "../../utils/logic";

const PaymentsForm = () => {
    const numOfPaymentsRef = useRef();
    const priceRef = useRef();
    const taxRef = useRef();
    const committeeRef = useRef();
    const dayRef = useRef();


    return (
        <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" padding="0 24px">
            <Box width="30%"  display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Price</Typography>
                        <TextField
                            inputRef={priceRef}
                            sx={{ width: '-webkit-fill-available', marginBottom: "8px" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                            }}
                        />
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Property tax (for two months)</Typography>
                        <TextField
                            inputRef={taxRef}
                            sx={{ width: '-webkit-fill-available', marginBottom: "8px" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                            }}
                        />
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">House committee</Typography>
                        <TextField
                            inputRef={committeeRef}
                            sx={{ width: '-webkit-fill-available', marginBottom: "8px" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                            }}
                        />
                </Box>
        </Box>
        <Box width="30%" display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Number of Payments</Typography>
                    <TextField
                        inputRef={numOfPaymentsRef}
                        select
                        required
                        sx={{width: '-webkit-fill-available', marginBottom: "8px"}}
                        >
                        {generateArrayFromRange(1,12).map((option, index) => (
                            <MenuItem key={index} value={option}>
                            {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Payment Day</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography variant="body1" fontSize="18px" fontWeight={300} lineHeight={1}>Every</Typography>
                            <FormControl variant="filled" sx={{ mx: 0, minWidth: "auto", marginLeft: "4px" }} size="small">
                                <Select
                                    inputRef={dayRef}
                                    size="small"
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    value={12}
                                    onChange={() => {}}
                                    sx={{ fontSize:"18px","& .MuiInputBase-inputSizeSmall" : {padding: "0 2px 0 0 !important"}, background: "white", "& .MuiSelect-iconFilled": { display: "none"} }}
                                    >
                                    {generateArrayFromRange(1, 31).map((option) => <MenuItem value={option}>{option}</MenuItem>)}
                                </Select>
                            </FormControl>
                        <Typography variant="body1" fontSize="18px" fontWeight={300} lineHeight={1}>th of the month</Typography>
                    </Box>
                </Box>
        </Box>
        <Box width="30%" display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
            <Typography variant="h4" fontWeight={400} >Total Payment</Typography>
            <Typography variant="h6" fontWeight={400} >{`4500₪`}</Typography>
        </Box>    
    </Box>

    );
}
 
export default PaymentsForm;