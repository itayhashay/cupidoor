import { useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, FormControl, InputAdornment, MenuItem, Select } from '@mui/material';
import { TextField, Typography } from '@mui/material';
import { generateArrayFromRange } from '../../utils/logic';
import { StepperApartment } from './types';
import { useFormikContext } from 'formik';

const PaymentsForm = ({
  handleNext,
  handleBack,
}: {
  handleNext: VoidFunction;
  handleBack: VoidFunction;
}) => {
  const {
    values: { price, tax, committee, numOfPayments, entranceDate, paymentDay, totalPrice },
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

  return (
    <>
      <Box
        width='100%'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        padding='0 24px'
      >
        <Box width='30%' display='flex' flexDirection='column'>
          <Box display='flex' flexDirection='column'>
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
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
              Property tax (for two months)
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
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
              House committee
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
          </Box>
        </Box>
        <Box width='30%' display='flex' flexDirection='column' alignItems='center'>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
              Number of Payments
            </Typography>
            <TextField
              name='numOfPayments'
              value={numOfPayments}
              onChange={handleChange}
              select
              required
              sx={{ width: '-webkit-fill-available', marginBottom: '8px' }}
            >
              {generateArrayFromRange(1, 12).map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
              Entrance Date
            </Typography>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                value={dayjs(entranceDate)}
                onChange={(date) => handleDatePickerChange(dayjs(date))}
                minDate={dayjs(new Date())}
                sx={{ marginBottom: '8px' }}
              />
            </DemoContainer>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
              Payment Day
            </Typography>
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Typography variant='body1' fontSize='18px' fontWeight={300} lineHeight={1}>
                Every
              </Typography>
              <FormControl
                variant='filled'
                sx={{ mx: 0, minWidth: 'auto', marginLeft: '4px' }}
                size='small'
              >
                <Select
                  // onChange={handleChangePaymentsDay}
                  onChange={handleChange}
                  value={paymentDay}
                  id='paymentDay'
                  name='paymentDay'
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
            </Box>
          </Box>
        </Box>
        <Box
          width='30%'
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Typography variant='h4' fontWeight={400}>
            Total Payment
          </Typography>
          <Box display='flex' flexDirection='row' justifyContent='center' alignItems='flex-end'>
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
        </Box>
      </Box>

      <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
        Back
      </Button>
      <Button variant='contained' onClick={handleNextWithValidation} sx={{ mt: 1, mr: 1 }}>
        {'Continue'}
      </Button>
    </>
  );
};

export default PaymentsForm;
