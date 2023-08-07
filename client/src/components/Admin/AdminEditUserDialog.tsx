import { forwardRef, useEffect, useState } from 'react';
import {
  ProfilePicture,
  ProfilePictureContainer,
  LinksDividerLine,
  LinkIcon,
} from '../UserRouter/styles';
import { User } from '../../types/user';
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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import useAPI from '../../hooks/useAPI';
import { convertFileToBase64 } from '../../utils/base64';
import { useSnackbar } from '../../context/SnackbarContext';

const defaultErrors = {
  firstName: false,
  lastName: false,
  email: false,
  avatar: false,
  password: false,
};
const Transition = forwardRef(function Transition(props: any, ref) {
  return <Slide direction={'up'} ref={ref} children={props.children} {...props} />;
});

const AdminEditUserDialog = ({
  open,
  userId,
  handleDialogClose,
  handleDialogSave,
}: {
  open: boolean;
  userId: string;
  handleDialogClose: () => void;
  handleDialogSave: () => void;

}) => {
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [userProfilePicture, setUserProfilePicture] = useState<string>('');
  const [errors, setErrors] = useState(defaultErrors);
  const { getAdminUser, adminUpdateUser,adminUpdatePassword } = useAPI();
  const { snackBarState, setSnackBarState } = useSnackbar();
  const [newPassword,setNewPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId !== null) {
        const data = await getAdminUser(userId);
        setUserDetails(data.user);
        setUserProfilePicture(data.user.avatar);
      }
    };
    fetchUser();
  }, [userId]);

  const handleFormChange = (event: any) => {
    let key = event.currentTarget.id;
    let value: any;
    switch (event.currentTarget.id) {
      case 'disabled':
        value = event.currentTarget.checked;
        break;
      case 'isAdmin':
        value = event.currentTarget.checked;
        break;
      default:
        value = event.currentTarget.value;
        break;
    }
    setUserDetails((prevState: any) => {
      return { ...prevState, ...{ [key]: value } };
    });
  };

  const validateForm = () => {
    setErrors(defaultErrors);
    const currentErrors: any = {};
    if (!userDetails?.firstName || userDetails.firstName.trim() === '') {
      currentErrors.firstName = true;
    }
    if (!userDetails?.lastName || userDetails.lastName.trim() === '') {
      currentErrors.lastName = true;
    }
    if (userProfilePicture === '') {
      currentErrors.avatar = true;
    }
    if (userDetails?.email.trim() === '') {
      currentErrors.email = true;
    }
    if (userDetails?.password && userDetails.password.trim().length < 8) {
      currentErrors.password = true;
    }
    if (Object.keys(currentErrors).length === 0) {
      return true;
    }
    setErrors(currentErrors);
    return false;
  };

  const handleSubmit = async () => {
    try {
      const userAvatar = userProfilePicture !== '' ? userProfilePicture : userDetails?.avatar;
    
      if (validateForm()) {
        const response = await adminUpdateUser({ ...userDetails, avatar: userAvatar } as User);
        if(userDetails?.password && userDetails.password.trim().length >= 8){
          const passResponse = await adminUpdatePassword(userDetails._id as string,userDetails.password);
        }
        setSnackBarState({
          severity: 'success',
          message: 'User updated Successfully!',
          show: true,
        });
        handleDialogSave();
        handleDialogClose();
      }
    } catch (ex) {
      setSnackBarState({
        severity: 'error',
        message: "Couldn't update user!",
        show: true,
      });
    }
  };

  const uploadProfilePicture = async (event: React.SyntheticEvent) => {
    const target: any = event.target;
    if (!target.files[0]) return;
    const base64 = await convertFileToBase64(target.files[0]);
    if (base64 === '') {
      setUserProfilePicture(userDetails?.avatar as string);
      return;
    }
    setUserProfilePicture(base64);
  };

  return !userDetails ? null : (
    <Dialog open={open} TransitionComponent={Transition} disableEscapeKeyDown>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar sx={{ backgroundColor: 'var(--main-app-blue)' }}>
          <Box display={'flex'} alignContent={'center'}>
            <Typography variant='h5' fontWeight={'bold'}>
              {userDetails?.firstName} {userDetails?.lastName}
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
        <Grid container gap={1}>
          <Grid item xs={12} justifyContent={'center'} alignItems={'center'} mb={5}>
            <Box
              display={'flex'}
              sx={{ ...ProfilePictureContainer }}
              justifyContent={'center'}
              textAlign={'center'}
            >
              <div style={{ position: 'relative', top: '105px' }}>
                <Box display={'flex'} justifyContent={'center'} position={'relative'}>
                  <Avatar
                    src={userProfilePicture}
                    sx={{ ...ProfilePicture }}
                    style={{ border: '3px solid white' }}
                  ></Avatar>
                  <IconButton
                    component='label'
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      zIndex: 1,
                      right: 15,
                      borderRadius: 9999,
                      minWidth: 30,
                      width: 30,
                      height: 30,
                      padding: 0,
                    }}
                    color='primary'
                  >
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <EditIcon></EditIcon>
                    </Avatar>
                    <input
                      id='avatar'
                      name='avatar'
                      hidden
                      accept='image/*'
                      type='file'
                      onChange={uploadProfilePicture}
                    />
                  </IconButton>
                </Box>

                <div>
                  <Typography variant='body1' fontWeight={'bold'} fontSize={'1.5em'}>
                    {`${userDetails?.firstName} ${userDetails?.lastName}`}
                  </Typography>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              margin='dense'
              id='firstName'
              label='First Name'
              type='string'
              variant='outlined'
              defaultValue={userDetails?.firstName}
              onChange={handleFormChange}
              required
              fullWidth
              error={errors.firstName}
              helperText={errors.firstName && 'Please enter a valid first name!'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              id='lastName'
              label='Last Name'
              type='string'
              variant='outlined'
              defaultValue={userDetails?.lastName}
              onChange={handleFormChange}
              required
              fullWidth
              error={errors.lastName}
              helperText={errors.lastName && 'Please enter a valid last name!'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              id='email'
              label='Email'
              type='string'
              variant='outlined'
              defaultValue={userDetails?.email}
              onChange={handleFormChange}
              fullWidth
              required
              error={errors.email}
              helperText={errors.email && 'Please enter a valid email!'}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin='dense'
              id='password'
              label='Password'
              type='password'
              variant='outlined'
              onChange={(handleFormChange)}
              fullWidth
              required
              error={errors.password}
              helperText={errors.password && 'Password should have at least 8 characters!'}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' justifyContent={'space-between'}>
              {/* <FormControlLabel
                label="Is active?"
                labelPlacement="top"
                control={
                  <Checkbox
                    id="disabled"
                    checked={!userDetails.disabled}
                    onChange={handleFormChange}></Checkbox>
                }></FormControlLabel> */}
              <FormControlLabel
                label='Is Admin?'
                labelPlacement='start'
                control={
                  <Checkbox
                    id='isAdmin'
                    checked={userDetails?.isAdmin ? userDetails?.isAdmin : false}
                    onChange={handleFormChange}
                  ></Checkbox>
                }
              ></FormControlLabel>
            </Box>
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

export default AdminEditUserDialog;
