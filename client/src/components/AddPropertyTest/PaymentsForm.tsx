import { useEffect, useRef, useState } from 'react';
import { MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { Box, Button, Divider, FormControl, Grid, InputAdornment } from '@mui/material';
import { generateArrayFromRange } from '../../utils/logic';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ApartmentPayments, StepperApartment } from './types';
import { DEFAULT_PAYMENTS } from './constants';
import { useFormikContext } from 'formik';
import { CustomHelperText } from '../Landing/AuthHelpers';

const PaymentsForm = ({
  handleNext,
  handleBack,
}: {
  handleNext: VoidFunction;
  handleBack: VoidFunction;
}) => {
  const {
    values: { price, tax, committee, numOfPayments, entranceDate, paymentDay, totalPrice },
    values,
    errors,
    handleChange,
    setFieldValue,
    validateForm,
  } = useFormikContext<StepperApartment>();

  const handleNextWithValidation = async () => {
    const requiredFields: ReadonlyArray<keyof StepperApartment> = [
      'price',
      'tax',
      'numOfPayments',
      'paymentDay',
    ] as const;

    const errs = await validateForm();

    if (requiredFields.every((field) => !errs[field])) {
      handleNext();
    }
  };

  const handleDatePickerChange = (value: Dayjs | null) => {
    setFieldValue('entranceDate', value);
  };

  useEffect(() => {
    setFieldValue('totalPrice', Number(price) + Number(committee) + Number(tax / 2));
  }, [committee, price, tax]);

  // const [paymentsState, setPaymentsState] = useState<ApartmentPayments>(DEFAULT_PAYMENTS);
  // const paymentsStateRef = useRef(paymentsState); // Create a mutable ref

  // const handleChangePaymentsDay = (event: SelectChangeEvent<number>) => {
  //   setPaymentsState((prev) => {
  //     return {
  //       ...prev,
  //       paymentDay: Number(event.target.value),
  //     };
  //   });
  // };

  // useEffect(() => {
  //   setPaymentsState((prev) => {
  //     return {
  //       ...prev,
  //       totalPrice:
  //         Number(paymentsState.price) +
  //         Number(paymentsState.committee) +
  //         Number(paymentsState.tax / 2),
  //     };
  //   });
  // }, [paymentsState.committee, paymentsState.price, paymentsState.tax]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={'h6'} color={'black'} fontWeight={'bold'}>
            Payments
          </Typography>
          <Typography variant='subtitle2' color={'GrayText'} mb={1}>
            This section lets you customize the financial details for your house listing. Fill in
            the rent price, taxes, and any applicable committee fees. Select your preferred payment
            day and provide the entrance date to ensure a smooth and hassle-free rental process.
            We've made it easy for you to manage payments effortlessly and efficiently.
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            Price
          </Typography>
          <TextField
            id='price'
            defaultValue={price}
            onChange={handleChange}
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '-webkit-fill-available', marginBottom: '8px' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₪</InputAdornment>,
            }}
          />
          {errors?.price && <CustomHelperText>{errors.price}</CustomHelperText>}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            Tax
          </Typography>
          <TextField
            id='tax'
            defaultValue={tax}
            onChange={handleChange}
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '-webkit-fill-available', marginBottom: '8px' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₪</InputAdornment>,
            }}
          />
          {errors?.tax && <CustomHelperText>{errors.tax}</CustomHelperText>}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            Committee
          </Typography>
          <TextField
            id='committee'
            defaultValue={committee}
            onChange={handleChange}
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '-webkit-fill-available', marginBottom: '8px' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>₪</InputAdornment>,
            }}
          />
          {errors?.committee && <CustomHelperText>{errors.committee}</CustomHelperText>}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            Number of payments
          </Typography>
          <TextField
            id='numOfPayments'
            name='numOfPayments'
            fullWidth
            value={numOfPayments}
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
          {errors?.numOfPayments && <CustomHelperText>{errors.numOfPayments}</CustomHelperText>}
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
                  onChange={handleChange}
                  value={paymentDay}
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
            {errors?.paymentDay && <CustomHelperText>{errors.paymentDay}</CustomHelperText>}
          </Box>
        </Grid>
        <Grid item xs={6}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              sx={{ width: '100%' }}
              value={dayjs(entranceDate)}
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
            <Typography variant='h5' fontWeight={400}>{`${totalPrice}₪`}</Typography>
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

      <Box
        sx={{
          width: 'auto',
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: '0 1rem 1rem 0',
        }}
      >
        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
        <Button variant='contained' onClick={handleNextWithValidation} sx={{ mt: 1, mr: 1 }}>
          {'Continue'}
        </Button>
      </Box>
    </>
  );
};

export default PaymentsForm;
