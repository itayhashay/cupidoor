import { TextField, Typography,Grid, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { ApartmentAddress, StepperApartment } from "./types";
import { DEFAULT_ADDRESS } from "./constants";

const AddressForm = ({apartmentData, saveChangesOnNext, errors} : {apartmentData: StepperApartment,  saveChangesOnNext: (values: any) => void, errors: any}) => {
    const [addressState, setAddressState] = useState<ApartmentAddress>(DEFAULT_ADDRESS) 

    useEffect(() => {
        setAddressState(apartmentData);
    }, [apartmentData]);
      

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        saveChangesOnNext({
            ...addressState,
          [e.target.id]: e.target.value
        });
    }

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'black'} fontWeight={'bold'}>
              Property Address
            </Typography>
            <Typography variant='subtitle2' color={'GrayText'} mb={1}>
              Enter the details of the apartment address, including the city, street, and house
              number
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={7}>
            <TextField
              id='city'
              label='City'
              fullWidth
              required
              focused
              value={addressState.city}
              onChange={handleChange}
              error={errors.city}
              helperText={errors.city && errors.city}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              id='street'
              label={'Street'}
              fullWidth
              required
              value={addressState.street}
              onChange={handleChange}
              error={errors.street}
              helperText={errors.street && errors.street}
            />
          </Grid>
          <Grid item xs={7}>
            <TextField
              id='houseNumber'
              label={'House number'}
              fullWidth
              value={addressState.houseNumber}
              onChange={handleChange}
              required
              type='number'
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={errors.houseNumber}
              helperText={errors.houseNumber && errors.houseNumber}
            />
          </Grid>
        </Grid>
      </>
    );
}
 
export default AddressForm;