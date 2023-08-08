import { Box, Divider, FormControl, Grid, InputAdornment, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { generateArrayFromRange } from "../../utils/logic";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { ApartmentPayments, StepperApartment } from "./types";
import { DEFAULT_PAYMENTS } from "./constants";

const PaymentsForm = ({apartmentData, saveChangesOnNext} : {apartmentData: StepperApartment,  saveChangesOnNext: (values: any) => void}) => {
    const [paymentsState, setPaymentsState] = useState<ApartmentPayments>(DEFAULT_PAYMENTS) 
    const paymentsStateRef = useRef(paymentsState); // Create a mutable ref

    useEffect(() => {
        setPaymentsState(apartmentData);
    }, [apartmentData]);

    useEffect(() => {
        paymentsStateRef.current = (paymentsState)
    }, [paymentsState]);

    useEffect(() => {
        return () => {
          saveChangesOnNext(paymentsStateRef.current);
        };
      }, []);
      

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPaymentsState((prev) => {
            return {
                ...prev,
                [e.target.id || e.target.name]: e.target.value
            }
        })
    }
    
    const handleChangePaymentsDay = (event: SelectChangeEvent<number>) => {
        setPaymentsState((prev) => {
            return {
                ...prev,
                paymentDay: Number(event.target.value)
            }
        })
    }

    const handleDatePickerChange = (value: Dayjs | null) => {
        setPaymentsState((prev) => {
            return {
                ...prev,
                entranceDate: value
            }
        })
    }

    useEffect(() => {
        setPaymentsState((prev) => {
            return {
                ...prev,
                totalPrice: Number(paymentsState.price) + Number(paymentsState.committee) + Number(paymentsState.tax/2)
            }
        })
    }, [paymentsState.committee, paymentsState.price, paymentsState.tax]);
  
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'black'} fontWeight={'bold'}>
              Payments
            </Typography>
            <Typography variant='subtitle2' color={'GrayText'} mb={1}>
            This section lets you customize the financial details for your house listing. Fill in the rent price, taxes, and any applicable committee fees. Select your preferred payment day and provide the entrance date to ensure a smooth and hassle-free rental process. We've made it easy for you to manage payments effortlessly and efficiently.
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='price'
              label={'Price'}
              fullWidth
              value={paymentsState.price}
              onChange={handleChange}
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>₪</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='tax'
              label={'Property Tax (for two months)'}
              fullWidth
              value={paymentsState.tax}
              onChange={handleChange}
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>₪</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='committee'
              label={'House Committee'}
              fullWidth
              value={paymentsState.committee}
              onChange={handleChange}
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              InputProps={{
                endAdornment: <InputAdornment position='end'>₪</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id='numOfPayments'
              name='numOfPayments'
              label='Number Of Payments'
              fullWidth
              value={paymentsState.numOfPayments}
              onChange={handleChange}
              select
              required
            >
              {generateArrayFromRange(1, 12).map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6} position={'relative'}>
            <Box border={'1px solid #cecece'} borderRadius={1} height={'100%'}>
              <Typography
                variant='caption'
                color={'GrayText'}
                textAlign={'center'}
                fontSize={'0.8rem'}
                position={'absolute'}
                top={5}
                left={25}
                width={100}
                bgcolor={'white'}
              >
                Payment Day
              </Typography>
              <Stack direction={'row'} height={'100%'} alignItems={'center'} mx={2} width={'100%'}>
                <Typography variant='body1' fontSize='18px' fontWeight={300} lineHeight={1}>
                  Every
                </Typography>
                <FormControl
                  variant='filled'
                  sx={{ mx: 0, minWidth: 'auto', marginLeft: '4px' }}
                  size='small'
                >
                  <Select
                    onChange={handleChangePaymentsDay}
                    value={paymentsState.paymentDay}
                    size='small'
                    labelId='demo-simple-select-filled-label'
                    sx={{
                      fontSize: '18px',
                      '& .MuiInputBase-inputSizeSmall': { padding: '0 2px 0 0 !important' },
                      background: 'white',
                      '& .MuiSelect-iconFilled': { display: 'none' },
                    }}
                  >
                    {generateArrayFromRange(1, 31).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography variant='body1' fontSize='18px' fontWeight={300} lineHeight={1}>
                  th of the month
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                sx={{ width: '100%' }}
                value={dayjs(paymentsState.entranceDate)}
                onChange={(date) => handleDatePickerChange(dayjs(date))}
                minDate={dayjs(new Date())}
              />
            </DemoContainer>
          </Grid>
          <Grid item xs={12} mt={3}>
            <Typography variant='h4' fontWeight={400}>
              Total Payment
            </Typography>
            <Box display='flex' flexDirection='row' alignItems='flex-end'>
              <Typography
                variant='h5'
                fontWeight={400}
              >{`${paymentsState.totalPrice}₪`}</Typography>
              <Typography
                variant='body1'
                fontSize='15px'
                fontWeight={100}
                margin='0 0 1px 1px'
                lineHeight={1.7}
              >
                /month
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </>
    );
}
 
export default PaymentsForm;