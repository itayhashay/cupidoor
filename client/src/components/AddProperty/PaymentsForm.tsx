import { Box, FormControl, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { generateArrayFromRange } from "../../utils/logic";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";

const PaymentsForm = ({activeStep, saveChangesOnNext} : {activeStep?: number, saveChangesOnNext?: (values: any) => void}) => {
    const [paymentDay, setPaymentDay] = useState<number>(10);
    const [entranceDate, setEntranceDate] = useState<Dayjs | null>(null);

    const numOfPaymentsRef = useRef();
    const [price, setPrice] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [committee, setCommittee] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>();

    useEffect(() => {
        console.log(activeStep)
        console.log("STEP CHANGE PAYMENTS")
    }, [activeStep]);

    useEffect(() => {
        setTotalPrice(price + committee + (tax/2));
    }, [price, tax, committee]);
  
    return (
        <Box width="100%" display="flex" flexDirection="row" justifyContent="space-between" padding="0 24px">
            <Box width="30%"  display="flex" flexDirection="column">
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Price</Typography>
                        <TextField
                            value={price}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}                       
                            sx={{ width: '-webkit-fill-available', marginBottom: "8px" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                            }}
                        />
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Property tax (for two months)</Typography>
                        <TextField
                            value={tax}
                            onChange={(e) => setTax(parseInt(e.target.value))}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}                       
                            sx={{ width: '-webkit-fill-available', marginBottom: "8px" }}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">₪</InputAdornment>,
                            }}
                        />
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">House committee</Typography>
                        <TextField
                            value={committee}
                            onChange={(e) => setCommittee(parseInt(e.target.value))}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}                       
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
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Entrance Date</Typography>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker    
                            value={entranceDate}
                            onChange={(date) => setEntranceDate(date)}                            
                            minDate={dayjs(new Date())}
                            sx={{marginBottom: "8px"}}/>
                    </DemoContainer>
                </Box>
                <Box display="flex" flexDirection="column">
                    <Typography variant="body1" fontWeight={700} marginTop="8px" marginBottom="5px">Payment Day</Typography>
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Typography variant="body1" fontSize="18px" fontWeight={300} lineHeight={1}>Every</Typography>
                            <FormControl variant="filled" sx={{ mx: 0, minWidth: "auto", marginLeft: "4px" }} size="small">
                                <Select
                                    value={paymentDay}
                                    onChange={(e) => setPaymentDay(e.target.value as number)} 
                                    size="small"
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
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
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                <Typography variant="h5" fontWeight={400} >{`${totalPrice}₪`}</Typography>
                <Typography variant="body1" fontSize="15px" fontWeight={100} margin="0 0 1px 1px">/month</Typography>
            </Box>
        </Box>    
    </Box>

    );
}
 
export default PaymentsForm;