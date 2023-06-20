import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { ProfileSectionTitle } from './styles';
import { User } from '../../types/user';
import { useState, useEffect } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { AxiosError } from 'axios';
import { CupidAxiosError } from '../../types/cupidAxiosError';
import { useFormik } from 'formik';
import { userDetailsScheme } from '../../utils/FormikSchema';
import useAPI from '../../hooks/useAPI';
const PersonalSecurity = ({
  user,
  handleEditMode,
}: {
  user: User;
  handleEditMode: (flag: boolean) => void;
}) => {
  const [isEditMode, _setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [userDetails, setUserDetails] = useState(() => ({ ...user }));
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAPI();
  const { setSnackBarState } = useSnackbar();
  const formik = useFormik({
    initialValues: { ...userDetails },
    validationSchema: userDetailsScheme,
    onSubmit: (values) => {
      handleSaveClick(values);
    },
  });

  useEffect(() => {
    setUserDetails({ ...user });
  }, [user]);
  const setIsEditMode = (flag: boolean) => {
    _setIsEditMode(flag);
    handleEditMode(flag);
  };

  const handleSaveClick = async (newUserDetails: User) => {
    setIsLoading(true);
    try {
      await updateUser(newUserDetails);
      setSnackBarState({
        message: 'Updated Successfully!',
        severity: 'success',
        show: true,
      });
      setIsEditMode(false);
    } catch (ex: any) {
      const error: AxiosError = ex;
      const errorData: CupidAxiosError = error.response?.data as CupidAxiosError;
      const message = errorData ? errorData.error : "Couldn't update your details!";
      setSnackBarState({
        message: message,
        severity: 'error',
        show: true,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    formik.setValues({ ...user });
  };

  return (
    <Grid item xs={12}>
      <form onSubmit={formik.handleSubmit}>
        <Box my={3}>
          <div style={{ position: 'relative', width: '100%' }}>
            {!isEditMode && <div style={{ float: 'right', position: 'relative', top: -10 }}></div>}
          </div>

          <Grid container width={'96%'} rowGap={2} columnSpacing={8}>
            <Grid item xs={12}>
              <Box display={'flex'} alignItems={'center'}>
                <Typography sx={{ ...ProfileSectionTitle, mb: 0, mr: 3 }}>Password</Typography>
                <Tooltip title='Edit'>
                  <IconButton size='large' color={'primary'} onClick={handleEditClick}>
                    <EditNoteIcon sx={{ fontSize: '1em' }}></EditNoteIcon>
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
            {!isEditMode && (
              <Grid item xs={12}>
                <TextField label={'Password'} type='password' value={'********'}></TextField>
              </Grid>
            )}
            {isEditMode && (
              <>
                <Grid item xs={12}>
                  <TextField label={'Current Password'} type='password' value={''}></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField label={'New Password'} type='password' value={''}></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField label={'Confirm New Password'} type='password' value={''}></TextField>
                </Grid>
                <Grid item xs={12} my={3}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Button
                      disabled={isLoading}
                      sx={{ mr: 2 }}
                      variant='contained'
                      onClick={handleCancelClick}
                      color='secondary'
                      startIcon={<CloseIcon></CloseIcon>}
                      fullWidth
                    >
                      Cancel
                    </Button>

                    <Button
                      disabled={isLoading}
                      startIcon={
                        isLoading ? (
                          <CircularProgress size={14}></CircularProgress>
                        ) : (
                          <CheckIcon></CheckIcon>
                        )
                      }
                      variant='contained'
                      // onClick={handleSaveClick}
                      type='submit'
                      fullWidth
                    >
                      Save
                    </Button>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <Divider></Divider>
      </form>
    </Grid>
  );
};

export default PersonalSecurity;
