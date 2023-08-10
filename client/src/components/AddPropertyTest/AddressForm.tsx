import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { StepperApartment } from './types';
import { CustomHelperText } from '../Landing/AuthHelpers';

const AddressForm = ({ handleNext }: { handleNext: VoidFunction }) => {
  const {
    values: { houseNumber, city, street },
    errors,
    handleChange,
    validateForm,
  } = useFormikContext<StepperApartment>();

  const handleNextWithValidation = async () => {
    const requiredFields: ReadonlyArray<keyof StepperApartment> = [
      'city',
      'street',
      'houseNumber',
    ] as const;

    const errs = await validateForm();

    if (requiredFields.every((field) => !errs[field])) {
      handleNext();
    }
  };

  return (
    <>
      <Box width='50%' display='flex' flexDirection='column' padding='0 24px'>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            City
          </Typography>
          <TextField id='city' name='city' required defaultValue={city} onChange={handleChange} />
          {errors?.city && <CustomHelperText>{errors.city}</CustomHelperText>}
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            Street
          </Typography>
          <TextField
            id='street'
            name='street'
            required
            defaultValue={street}
            onChange={handleChange}
          />
          {errors?.street && <CustomHelperText>{errors.street}</CustomHelperText>}
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            House Number
          </Typography>
          <TextField
            id='houseNumber'
            name='houseNumber'
            defaultValue={houseNumber}
            onChange={handleChange}
            required
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '-webkit-fill-available', marginBottom: '8px' }}
          />
          {errors?.houseNumber && <CustomHelperText>{errors.houseNumber}</CustomHelperText>}
        </Box>
      </Box>

      <Box
        sx={{
          width: 'auto',
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: '0 1rem 1rem 0',
        }}
      >
        <Button disabled sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
        <Button variant='contained' sx={{ mt: 1, mr: 1 }} onClick={handleNextWithValidation}>
          {'Continue'}
        </Button>
      </Box>
    </>
  );
};

export default AddressForm;
