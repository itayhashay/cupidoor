import { Grid, Button, TextField, Typography, Box } from '@mui/material';
import { Checkbox, Divider, FormControlLabel, InputAdornment, MenuItem } from '@mui/material';
import { PROPERTY_CONDITIONS } from '../../utils/properyConditions';
import { StepperApartment } from './types';
import { CHECKBOXES_DEFAULT } from './constants';
import { useFormikContext } from 'formik';
import { CustomHelperText } from '../Landing/AuthHelpers';

const AboutForm = ({
  handleBack,
  handleNext,
}: {
  handleBack: VoidFunction;
  handleNext: VoidFunction;
}) => {
  const {
    values: { propertyCondition, houseArea, description, balconies, parkings, rooms, floor },
    values,
    errors,
    handleChange,
    setFieldValue,
    validateForm,
  } = useFormikContext<StepperApartment>();

  const handleChangeToggleGroup = (event: React.MouseEvent<HTMLElement>, value: any) => {
    const parentId = (event.currentTarget.parentNode as HTMLElement).id;
    setFieldValue(parentId, parseFloat(value));
  };

  const handleNextWithValidation = async () => {
    const requiredFields: ReadonlyArray<keyof StepperApartment> = [
      'propertyCondition',
      'houseArea',
      'description',
    ] as const;

    const errs = await validateForm();

    if (requiredFields.every((field) => !errs[field])) {
      handleNext();
    }
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
            name='description'
            fullWidth
            multiline
            maxRows={8}
            defaultValue={description}
            onChange={handleChange}
            minRows={7}
            placeholder='Enter a detailed description of your property here. Highlight its unique features, amenities, and any other important information that potential renters should know.'
            inputProps={{
              color: 'black',
            }}
          />
          {errors?.description && <CustomHelperText>{errors.description}</CustomHelperText>}
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='propertyCondition'
            id='propertyCondition'
            label={'Property Condition'}
            fullWidth
            defaultValue={propertyCondition}
            onChange={handleChange}
            select
            required
          >
            {Object.values(PROPERTY_CONDITIONS).map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          {errors?.propertyCondition && (
            <CustomHelperText>{errors.propertyCondition}</CustomHelperText>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            id='houseArea'
            name='houseArea'
            label={'House Area'}
            fullWidth
            defaultValue={houseArea}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position='end'>m²</InputAdornment>,
            }}
          />
          {errors?.houseArea && <CustomHelperText>{errors.houseArea}</CustomHelperText>}
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='rooms'
            name='rooms'
            label={'Rooms'}
            fullWidth
            defaultValue={rooms}
            onChange={handleChange}
          />
          {errors?.rooms && <CustomHelperText>{errors.rooms}</CustomHelperText>}
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='floor'
            name='floor'
            label={'Floor'}
            fullWidth
            defaultValue={floor}
            onChange={handleChange}
          />
          {errors?.floor && <CustomHelperText>{errors.floor}</CustomHelperText>}
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='balconies'
            name='balconies'
            label={'Balconies'}
            fullWidth
            defaultValue={balconies}
            onChange={handleChange}
          />
          {errors?.balconies && <CustomHelperText>{errors.balconies}</CustomHelperText>}
        </Grid>
        <Grid item xs={3}>
          <TextField
            id='parkings'
            name='parkings'
            label={'Parking Spots'}
            fullWidth
            defaultValue={parkings}
            onChange={handleChange}
          />
          {errors?.parkings && <CustomHelperText>{errors.parkings}</CustomHelperText>}
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
                      name={checkboxesProp.key}
                      checked={Boolean(values[checkboxesProp.key as keyof typeof values])}
                      // onChange={handleChangeCheckbox}
                      onChange={handleChange}
                    />
                  }
                  label={checkboxesProp.display}
                />
              </Grid>
            ))}
          </Grid>
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
        <Button
          variant='contained'
          // disabled={isValidStep}
          onClick={handleNextWithValidation}
          sx={{ mt: 1, mr: 1 }}
        >
          {'Continue'}
        </Button>
      </Box>
    </>
  );
};

export default AboutForm;
