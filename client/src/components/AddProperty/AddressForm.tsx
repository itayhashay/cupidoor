import { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ApartmentAddress, StepperApartment } from './types';
import { DEFAULT_ADDRESS } from './constants';

const AddressForm = ({
  apartmentData,
  saveChangesOnNext,
  handleNext,
}: {
  apartmentData: StepperApartment;
  saveChangesOnNext: (values: any) => void;
  handleNext: () => void;
}) => {
  const [addressState, setAddressState] = useState<ApartmentAddress>(DEFAULT_ADDRESS);
  const addressStateRef = useRef(addressState); // Create a mutable ref

  useEffect(() => {
    setAddressState(apartmentData);
  }, [apartmentData]);

  useEffect(() => {
    addressStateRef.current = addressState;
  }, [addressState]);

  useEffect(() => {
    return () => {
      saveChangesOnNext(addressStateRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddressState((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <>
      <Box width='50%' display='flex' flexDirection='column' padding='0 24px'>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            City
          </Typography>
          <TextField id='city' required value={addressState.city} onChange={handleChange} />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            Street
          </Typography>
          <TextField id='street' required value={addressState.street} onChange={handleChange} />
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography variant='body1' fontWeight={700} marginTop='8px' marginBottom='5px'>
            House Number
          </Typography>
          <TextField
            id='houseNumber'
            value={addressState.houseNumber}
            onChange={handleChange}
            required
            type='number'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ width: '-webkit-fill-available', marginBottom: '8px' }}
          />
        </Box>
      </Box>

      <Box
        sx={{ width: 'auto', position: 'absolute', bottom: 0, right: 0, margin: '0 1rem 1rem 0' }}
      >
        <Button disabled={true} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
        <Button
          variant='contained'
          // disabled={isValidStep}
          onClick={handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          {'Continue'}
        </Button>
      </Box>
    </>
  );
};

export default AddressForm;
