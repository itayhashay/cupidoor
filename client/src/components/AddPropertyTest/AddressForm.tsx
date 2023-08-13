import { Box, TextField, Typography, Grid, Divider, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ApartmentAddress, StepperApartment } from './types';
import { DEFAULT_ADDRESS } from './constants';
import { useFormikContext } from 'formik';
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

  // const [addressState, setAddressState] = useState<ApartmentAddress>(DEFAULT_ADDRESS);
  // const addressStateRef = useRef(addressState); // Create a mutable ref

  // useEffect(() => {
  //   setAddressState(apartmentData);
  // }, [apartmentData]);

  // useEffect(() => {
  //   addressStateRef.current = addressState;
  // }, [addressState]);

  // useEffect(() => {
  //   return () => {
  //     saveChangesOnNext(addressStateRef.current);
  //   };
  // }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setAddressState((prev) => {
  //     return {
  //       ...prev,
  //       [e.target.id]: e.target.value,
  //     };
  //   });
  // };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant={'h6'} color={'black'} fontWeight={'bold'}>
            Property Address
          </Typography>
          <Typography variant='subtitle2' color={'GrayText'} mb={1}>
            Enter the details of the apartment address, including the city, street, and house number
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id='city'
            label='City'
            fullWidth
            required
            defaultValue={city}
            onChange={handleChange}
          />
          {errors?.city && <CustomHelperText>{errors.city}</CustomHelperText>}
        </Grid>
        <Grid item xs={7}>
          <TextField
            id='street'
            label={'Street'}
            fullWidth
            required
            defaultValue={street}
            onChange={handleChange}
          />
          {errors?.street && <CustomHelperText>{errors.street}</CustomHelperText>}
        </Grid>
        <Grid item xs={7}>
          <TextField
            id='houseNumber'
            name='houseNumber'
            label={'House number'}
            fullWidth
            defaultValue={houseNumber}
            onChange={handleChange}
            required
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          {errors?.houseNumber && <CustomHelperText>{errors.houseNumber}</CustomHelperText>}
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
