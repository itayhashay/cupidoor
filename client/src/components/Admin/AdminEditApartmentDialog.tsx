import { forwardRef, useEffect, useState } from 'react';
import {
  ProfilePicture,
  ProfilePictureContainer,
  LinksDividerLine,
  LinkIcon,
} from '../UserRouter/styles';
import EditIcon from '@mui/icons-material/Edit';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import useAPI from '../../hooks/useAPI';
import { convertFileToBase64 } from '../../utils/base64';
import { useSnackbar } from '../../context/SnackbarContext';
import { StepperApartment } from '../AddPropertyTest/types';
import { PropertyFeaturesFilters } from '../../utils/filters';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PROPERTY_CONDITIONS } from '../../utils/properyConditions';

const defaultErrors = {
  city: false,
  street: false,
  houseNumber: false,
  floor: false,
  rooms: false,
  balconies: false,
  parkings: false,
  houseArea: false,
  price: false,
  tax: false,
  committee: false,
};
const Transition = forwardRef(function Transition(props: any, ref) {
  return <Slide direction={'up'} ref={ref} children={props.children} {...props} />;
});

const AdminEditApartmentDialog = ({
  open,
  apartmentId,
  handleDialogClose,
  handleDialogSave,
}: {
  open: boolean;
  apartmentId: string;
  handleDialogClose: () => void;
  handleDialogSave: () => void;
}) => {
  const [apartmentDetails, setApartmentDetails] = useState<StepperApartment | null>(null);
  const [errors, setErrors] = useState(defaultErrors);
  const { getAdminUser, getApartmentById, editApartment } = useAPI();
  const { snackBarState, setSnackBarState } = useSnackbar();

  useEffect(() => {
    const fetchUser = async () => {
      if (apartmentId !== null) {
        const data: any = await getApartmentById(apartmentId);
        setApartmentDetails(data);
      }
    };
    fetchUser();
  }, [apartmentId]);

  const handleFormChange = (event: any) => {
    let key = event.currentTarget ? event.currentTarget.id : event.target.name;
    const inputType = event.currentTarget ? event.currentTarget.type : 'select';
    let value: any;
    switch (inputType) {
      case 'checkbox':
        value = event.currentTarget.checked;
        break;
      case 'select':
        value = event.target.value;
        break;
      default:
        value = event.currentTarget.value;
        break;
    }
    setApartmentDetails((prevState: any) => {
      return { ...prevState, ...{ [key]: value } };
    });
  };

  const validateForm = () => {
    setErrors(defaultErrors);
    const currentErrors: any = {};
    if (!apartmentDetails?.city || apartmentDetails.city.trim() === '') {
      currentErrors.city = true;
    }
    if (!apartmentDetails?.street || apartmentDetails.street.trim() === '') {
      currentErrors.street = true;
    }

    if (!apartmentDetails?.houseNumber || apartmentDetails?.houseNumber < 0) {
      currentErrors.houseNumber = true;
    }
    if (!apartmentDetails?.houseArea || apartmentDetails?.houseArea <= 0) {
      currentErrors.houseArea = true;
    }
    if (isNaN(apartmentDetails?.floor as number)) {
      currentErrors.floor = true;
    }
    if (!apartmentDetails?.rooms || apartmentDetails?.rooms <= 0) {
      currentErrors.rooms = true;
    }
    if (!apartmentDetails?.balconies || apartmentDetails?.balconies <= 0) {
      currentErrors.balconies = true;
    }
    if (!apartmentDetails?.parkings || apartmentDetails?.parkings < 0) {
      currentErrors.parkings = true;
    }
    if (!apartmentDetails?.price || apartmentDetails?.price <= 0) {
      currentErrors.price = true;
    }
    if (!apartmentDetails?.tax || apartmentDetails?.tax <= 0) {
      currentErrors.tax = true;
    }
    if (!apartmentDetails?.committee || apartmentDetails?.committee <= 0) {
      currentErrors.committee = true;
    }
    if (Object.keys(currentErrors).length === 0) {
      return true;
    }
    setErrors(currentErrors);
    return false;
  };

  const handleSubmit = async () => {
    try {
      if (validateForm()) {
        const response = await editApartment(apartmentDetails as StepperApartment);
        setSnackBarState({
          severity: 'success',
          message: 'Apartment updated Successfully!',
          show: true,
        });
        handleDialogSave();
        handleDialogClose();
      }
    } catch (ex) {
      setSnackBarState({
        severity: 'error',
        message: "Couldn't update apartment!",
        show: true,
      });
    }
  };

  return !apartmentDetails ? null : (
    <Dialog open={open} TransitionComponent={Transition} maxWidth='lg' disableEscapeKeyDown>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
          <Box display={'flex'} color={'white'} alignItems={'center'} height={'100%'}>
            <LocationOnIcon></LocationOnIcon>
            <Typography variant='h5' fontWeight={'bold'} ml={1}>
              {`${apartmentDetails.city}, ${apartmentDetails.street} ${apartmentDetails.houseNumber}`}
            </Typography>
          </Box>

          <IconButton
            edge='end'
            sx={{ color: 'white', right: 15, position: 'absolute' }}
            onClick={handleDialogClose}
          >
            <Close></Close>
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container spacing={1} m={0} width={'100%'}>
          <Grid item xs={4}>
            <TextField
              autoFocus
              margin='dense'
              id='city'
              label='City'
              type='string'
              variant='outlined'
              defaultValue={apartmentDetails?.city}
              onChange={handleFormChange}
              required
              fullWidth
              error={errors.city}
              helperText={errors.city && 'Please enter a valid city!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='street'
              label='Street'
              type='string'
              variant='outlined'
              defaultValue={apartmentDetails?.street}
              onChange={handleFormChange}
              required
              fullWidth
              error={errors.street}
              helperText={errors.street && 'Please enter a valid street!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='houseNumber'
              label='House Number'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.houseNumber}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.houseNumber}
              helperText={errors.houseNumber && 'Please enter a valid house number!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='houseArea'
              label='House Area'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.houseArea}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.houseArea}
              helperText={errors.houseArea && 'Please enter a valid house area!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='floor'
              label='Floor'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.floor}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.floor}
              helperText={errors.floor && 'Please enter a valid floor number!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='rooms'
              label='Rooms'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.rooms}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.rooms}
              helperText={errors.rooms && 'Please enter a valid room number!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='balconies'
              label='Balconies'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.balconies}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.balconies}
              helperText={errors.balconies && 'Please enter a valid balconies number!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='parkings'
              label='Parkings'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.parkings}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.parkings}
              helperText={errors.parkings && 'Please enter a valid parkings number!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='propertyCondition'
              name='propertyCondition'
              label='Property Condition'
              variant='outlined'
              defaultValue={apartmentDetails?.propertyCondition}
              value={apartmentDetails?.propertyCondition}
              onChange={handleFormChange}
              fullWidth
              select
              required
            >
              {Object.values(PROPERTY_CONDITIONS).map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='price'
              label='Price'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.price}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.price}
              helperText={errors.price && 'Please enter a valid price!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='tax'
              label='Taxes'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.tax}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.tax}
              helperText={errors.tax && 'Please enter a valid taxes value!'}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              margin='dense'
              id='committee'
              label='Committee'
              type='number'
              variant='outlined'
              defaultValue={apartmentDetails?.committee}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.committee}
              helperText={errors.committee && 'Please enter a valid committee value!'}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container borderRadius={3} padding={1} bgcolor={'#F5F5F5'} wrap='wrap'>
              {PropertyFeaturesFilters.map((feature) => {
                return (
                  <Grid item xs={12} sm={6} md={4} key={feature.filterName}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={feature.filterName}
                          onChange={handleFormChange}
                          checked={apartmentDetails && apartmentDetails[feature.filterName]}
                        ></Checkbox>
                      }
                      label={feature.displayName}
                    ></FormControlLabel>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container spacing={1} direction={'row'} width={'100%'}>
          <Grid item xs={6}>
            <Button
              fullWidth
              onClick={handleDialogClose}
              sx={{ color: 'primary.light' }}
              variant='outlined'
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleSubmit} sx={{ color: 'white' }} variant='contained' fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEditApartmentDialog;
