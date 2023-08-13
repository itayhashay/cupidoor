import { Checkbox, Divider, FormControlLabel, Grid, InputAdornment, MenuItem, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PROPERTY_CONDITIONS } from "../../utils/properyConditions";
import { ApartmentAbout, StepperApartment } from "./types";
import { CHECKBOXES_DEFAULT, DEFAULT_ABOUT } from "./constants";
import { CustomHelperText } from "../../utils/FormikSchema";
  
const AboutForm = ({apartmentData, saveChangesOnNext, errors} : {apartmentData: StepperApartment,  saveChangesOnNext: (values: any) => void, errors: any}) => {
    const [aboutState, setAboutState] = useState<ApartmentAbout>(DEFAULT_ABOUT) 

    useEffect(() => {
        setAboutState(apartmentData);
    }, [apartmentData]);      

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      saveChangesOnNext({
          ...aboutState,
        [e.target.id || e.target.name]: e.target.value
      });
    }

    const handleChangeToggleGroup = (event: React.MouseEvent<HTMLElement>, value: any) => {
        const parentId = (event.currentTarget.parentNode as HTMLElement).id;
        
        setAboutState((prev) => {
            return {
                ...prev,
                [parentId]: parseFloat(value)
            }
        })
    }
    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAboutState((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.checked
            }
        })
    };

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={'h6'} color={'black'} fontWeight={'bold'}>
              About The Property
            </Typography>
            <Typography variant='subtitle2' color={'GrayText'} mb={1}>
              Tell us more about your property's condition, total house area, room details, parking
              availability, balcony features, and any other essential information to enhance your
              listing and attract potential renters.
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='caption' color={'GrayText'} fontSize={'1rem'} ml={1}>
              Description
            </Typography>
            <TextField
              id='description'
              fullWidth
              multiline
              maxRows={8}
              value={aboutState.description}
              onChange={handleChange}
              minRows={7}
              style={{resize: "none", fontSize: "14px", fontFamily:"'Roboto'", wordSpacing: 1.5, 
              borderRadius: "4px", border: `1px solid ${errors.description ? 'rgb(211 48 47)':'#c4c4c4'}`}} 
              placeholder='Enter a detailed description of your property here. Highlight its unique features, amenities, and any other important information that potential renters should know.'
              inputProps={{
                color:"black"
              }}
            />
            {errors.description && <CustomHelperText>{errors.description}</CustomHelperText>}
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='propertyCondition'
              name='propertyCondition'
              label={'Property Condition'}
              fullWidth
              value={aboutState.propertyCondition}
              onChange={handleChange}
              select
              required
              error={errors.propertyCondition}
              helperText={errors.propertyCondition && errors.propertyCondition}
            >
              {Object.values(PROPERTY_CONDITIONS).map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id='houseArea'
              label={'House Area'}
              fullWidth
              value={aboutState.houseArea}
              onChange={handleChange}
              error={errors.houseArea}
              helperText={errors.houseArea && errors.houseArea}
              InputProps={{
                endAdornment: <InputAdornment position='end'>m²</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='rooms'
              label={'Rooms'}
              fullWidth
              value={aboutState.rooms}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='floor'
              label={'Floor'}
              fullWidth
              value={aboutState.floor}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='balconies'
              label={'Balconies'}
              fullWidth
              value={aboutState.balconies}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='parkings'
              label={'Parking Spots'}
              fullWidth
              value={aboutState.parkings}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h6' color={'black'}>
              Apartment Features
            </Typography>
            <Divider></Divider>
            <Grid container>
              {CHECKBOXES_DEFAULT.map((checkboxesProp, index) => (
                <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
                  <FormControlLabel
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '14px' } }}
                    control={
                      <Checkbox
                        size='small'
                        id={checkboxesProp.key}
                        checked={Boolean(aboutState[checkboxesProp.key as keyof typeof aboutState])}
                        onChange={handleChangeCheckbox}
                      />
                    }
                    label={checkboxesProp.display}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}
 
export default AboutForm;