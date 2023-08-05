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
  Select,
  MenuItem
} from '@mui/material';
import {
  ProfilePersonalDetailsTitleContainer,
  ProfilePersonalDetailsTitleLabel,
  ProfileSectionTitle,
} from "./styles";
import { User } from '../../types/user';
import { useState, useEffect,useMemo } from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { AxiosError } from 'axios';
import { CupidAxiosError } from '../../types/cupidAxiosError';
import { useFormik } from 'formik';
import { userPasswordSchema } from '../../utils/FormikSchema';
import useAPI from '../../hooks/useAPI';
import BadgeIcon from "@mui/icons-material/Badge";

 type AccountField = {
  name: string;
  path: string;
  icon: JSX.Element;
  type?: string;
  options?: { title: string; value: string }[];
};
type PersonalSecurityType = {
  [key: string]: any;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const FieldComponent = ({
  field,
  value,
  disabled,
  isReadOnly,
  handleFieldChange,
  error,
  helperText,
}: {
  field: AccountField;
  value: string;
  disabled: boolean;
  isReadOnly: boolean;
  handleFieldChange: any;
  error: any;
  helperText: any;
}) => {
  return (
    <Grid
      item
      xs={6}
      sx={{ ...ProfilePersonalDetailsTitleContainer }}
      key={field.path}
    >
      <Box display={"flex"} alignItems={"center"} mb={1}>
        {/* {field.icon} */}
        <Typography sx={{ ...ProfilePersonalDetailsTitleLabel }}>
          {field.name}
        </Typography>
      </Box>
      <Box display={"flex"}>
        {(() => {
             return (
              <TextField
                id={field.path}
                name={field.path}
                key={field.path}
                disabled={disabled}
                error={error}
                type={field.type}
                helperText={helperText}
                // sx={{ width: 210 }}
                value={value}
                size="small"
                fullWidth
                onChange={handleFieldChange}
                inputProps={{ readOnly: !isReadOnly }}
              ></TextField>
            );
        })()}
      </Box>
    </Grid>
  );
};


const PersonalSecurity = ({
  user,
  handleEditMode,
}: {
  user: User;
  handleEditMode: (flag: boolean) => void;
}) => {
  const [isEditMode, _setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword } = useAPI();
  const { setSnackBarState } = useSnackbar();
  const formik = useFormik({
    initialValues: { currentPassword:"",newPassword:"",confirmPassword:"" } as PersonalSecurityType,
    validationSchema: userPasswordSchema,
    onSubmit: (values) => {
      handleSaveClick(values);
    },
  });


  const setIsEditMode = (flag: boolean) => {
    _setIsEditMode(flag);
    handleEditMode(flag);
  };

  const handleSaveClick = async (values:PersonalSecurityType) => {
    setIsLoading(true);

    try {
      await updatePassword(values.currentPassword, values.newPassword, values.confirmPassword);
      setSnackBarState({
        message: 'Password updated successfully!',
        severity: 'success',
        show: true,
      });
      setIsEditMode(false);
    } catch (ex: any) {
      const error: AxiosError = ex;
      const errorData: CupidAxiosError = error.response?.data as CupidAxiosError;
      const message = errorData ? errorData.error : "Couldn't update your password!";
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
    formik.setValues({currentPassword:"",newPassword:"",confirmPassword:"" });
  };
  const accountFields: AccountField[] = useMemo(() => {
    return [
      {
        name: 'Current Password',
        path: 'currentPassword',
        type: 'password',
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name: 'New Password',
        path: 'newPassword',
        type: 'password',
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name: 'Confirm Password',
        path: 'confirmPassword',
        type: 'password',
        icon: <BadgeIcon></BadgeIcon>,
      },
    ];
  }, []);

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
                {accountFields.map((field) => {
              return (
                <>
                  <FieldComponent
                    key={field.path}
                    field={field}
                    value={formik.values[field.path]}
                    disabled={isLoading}
                    isReadOnly={isEditMode}
                    handleFieldChange={formik.handleChange}
                    error={formik.touched[field.path] && Boolean(formik.errors[field.path])}
                    helperText={formik.touched[field.path] && formik.errors[field.path]}
                  ></FieldComponent>
                  <Grid item xs={6}></Grid>
                </>
              );
            })}
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
