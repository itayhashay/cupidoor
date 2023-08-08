import { Box, TextField, Typography,Grid, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ApartmentAddress, StepperApartment } from "./types";
import { DEFAULT_ADDRESS } from "./constants";

const AddressForm = ({apartmentData, saveChangesOnNext} : {apartmentData: StepperApartment,  saveChangesOnNext: (values: any) => void}) => {
    const [addressState, setAddressState] = useState<ApartmentAddress>(DEFAULT_ADDRESS) 
    const addressStateRef = useRef(addressState); // Create a mutable ref

    useEffect(() => {
        setAddressState(apartmentData);
    }, [apartmentData]);

    useEffect(() => {
        addressStateRef.current = (addressState)
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
                [e.target.id]: e.target.value
            }
        })
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
            />
          </Grid>
        </Grid>
      </>
    );
}
 
export default AddressForm;