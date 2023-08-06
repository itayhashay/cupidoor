import { useEffect, useRef, useState } from 'react';
import { Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box, Checkbox, Divider, FormControlLabel, InputAdornment, MenuItem } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { PROPERTY_CONDITIONS } from '../../utils/properyConditions';
import { generateArrayFromRange } from '../../utils/logic';
import { ApartmentAbout, StepperApartment } from './types';
import { CHECKBOXES_DEFAULT, DEFAULT_ABOUT } from './constants';

const AboutForm = ({
  apartmentData,
  saveChangesOnNext,
}: {
  apartmentData: StepperApartment;
  saveChangesOnNext: (values: any) => void;
}) => {
  const [aboutState, setAboutState] = useState<ApartmentAbout>(DEFAULT_ABOUT);
  const aboutStateRef = useRef(aboutState); // Create a mutable ref

  useEffect(() => {
    setAboutState(apartmentData);
  }, [apartmentData]);

  useEffect(() => {
    aboutStateRef.current = aboutState;
  }, [aboutState]);

  useEffect(() => {
    return () => {
      saveChangesOnNext(aboutStateRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAboutState((prev) => {
      return {
        ...prev,
        [e.target.id || e.target.name]: e.target.value,
      };
    });
  };

  const handleChangeToggleGroup = (event: React.MouseEvent<HTMLElement>, value: any) => {
    const parentId = (event.currentTarget.parentNode as HTMLElement).id;

    setAboutState((prev) => {
      return {
        ...prev,
        [parentId]: parseFloat(value),
      };
    });
  };
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAboutState((prev) => {
      return {
        ...prev,
        [event.target.id]: event.target.checked,
      };
    });
  };

  return (
    <Box
      width='100%'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      padding='0 24px'
    >
      <Box
        height='45%'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        marginBottom='16px'
      >
        <Box display='flex' flexDirection='column' width='48%'>
          <Typography variant='body1' fontWeight={700} marginBottom='5px'>
            Property Condition
          </Typography>
          <TextField
            name='propertyCondition'
            value={aboutState.propertyCondition}
            onChange={handleChange}
            select
            required
            sx={{ width: '-webkit-fill-available' }}
          >
            {Object.values(PROPERTY_CONDITIONS).map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Typography variant='body1' fontWeight={700} marginTop='16px'>
            House area (in square meters)
          </Typography>
          <TextField
            id='houseArea'
            value={aboutState.houseArea}
            onChange={handleChange}
            sx={{ width: '-webkit-fill-available', marginBottom: '16px' }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>m²</InputAdornment>,
            }}
          />
        </Box>
        <Box display='flex' flexDirection='column' width='48%'>
          <Typography variant='body1' fontWeight={700} marginBottom='5px'>
            Description
          </Typography>
          <TextareaAutosize
            id='description'
            value={aboutState.description}
            onChange={handleChange}
            minRows={7.5}
            style={{
              resize: 'none',
              padding: '12px',
              fontSize: '14px',
              fontFamily: "'Roboto'",
              wordSpacing: 1.5,
              borderRadius: '4px',
              border: '1px solid #c4c4c4',
            }}
            placeholder='Describe your property, the condition of the furnishings, the frequency of maintenance, etc.'
          />
        </Box>
      </Box>
      <Box
        height='45%'
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <Box width='48%' display='flex' flexDirection='row' justifyContent='space-between'>
          <Box display='flex' flexDirection='column' marginRight='2rem' width='48%'>
            <Box display='flex' flexDirection='column' marginBottom='1rem'>
              <Typography variant='body1' fontWeight={700} marginBottom='5px'>
                Balcony
              </Typography>
              <ToggleButtonGroup
                size='small'
                sx={{ border: '0.5px solid #c4c4c4', width: 'fit-content' }}
                color='primary'
                exclusive
                id='balconies'
                value={aboutState.balconies}
                onChange={handleChangeToggleGroup}
              >
                {generateArrayFromRange(0, 5).map((number) => (
                  <ToggleButton key={number} value={number}>
                    {number}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1' fontWeight={700} marginBottom='5px'>
                Parking Spots
              </Typography>
              <ToggleButtonGroup
                size='small'
                sx={{ border: '0.5px solid #c4c4c4', width: 'fit-content' }}
                color='primary'
                exclusive
                id='parkings'
                value={aboutState.parkings}
                onChange={handleChangeToggleGroup}
              >
                {generateArrayFromRange(0, 5).map((number) => (
                  <ToggleButton key={number} value={number}>
                    {number}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column' width='48%'>
            <Box display='flex' flexDirection='column' marginBottom='1rem'>
              <Typography variant='body1' fontWeight={700} marginBottom='5px'>
                Rooms
              </Typography>
              <ToggleButtonGroup
                size='small'
                sx={{
                  maxWidth: 'calc(100% - 2vh)',
                  overflowY: 'auto',
                  border: '0.5px solid #c4c4c4',
                }}
                color='primary'
                exclusive
                id='rooms'
                value={aboutState.rooms}
                onChange={handleChangeToggleGroup}
              >
                {generateArrayFromRange(1, 10, 0.5).map((number) => (
                  <ToggleButton key={number} value={number}>
                    {number}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1' fontWeight={700} marginBottom='5px'>
                Floor
              </Typography>
              <ToggleButtonGroup
                size='small'
                sx={{
                  maxWidth: 'calc(100% - 2vh)',
                  overflowY: 'auto',
                  border: '0.5px solid #c4c4c4',
                }}
                color='primary'
                exclusive
                id='floor'
                value={aboutState.floor}
                onChange={handleChangeToggleGroup}
              >
                {generateArrayFromRange(-1, 20).map((number) => (
                  <ToggleButton key={number} value={number}>
                    {number}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>
        <Divider orientation='vertical' />
        <Box width='48%' display='flex' flexDirection='row'>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {CHECKBOXES_DEFAULT.map((checkboxesProp, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutForm;
