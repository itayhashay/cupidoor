import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, CssBaseline, TextField, Box, CircularProgress } from '@mui/material';
import { Typography, Container, Link, Grid, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { loginScheme, CustomHelperText } from './AuthHelpers';
import { Formik } from 'formik';
import './SignIn.css';
import { useSnackbar } from '../../context/SnackbarContext';
import UseAuthApi from '../../hooks/useAuthAPI';

interface SignInPageProps {
  onTogglePage: () => void;
}

const SignInPage = ({ onTogglePage }: SignInPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { snackBarState, setSnackBarState } = useSnackbar();
  const { signIn } = UseAuthApi();

  const onSubmitHandler = async (values: { email: string; password: string }) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    setIsLoading(true);

    const response: any = await signIn(userData.email, userData.password);
    setIsLoading(false);
    if (response.success) {
      setSnackBarState({
        severity: 'success',
        message: 'Welcome Back!',
        show: true,
      });
      navigate(location.state ? location.state.redirect : '/questions'); // isAllAnswered ? redirect /home
    } else {
      setSnackBarState({
        severity: 'error',
        message: response.error,
        show: true,
      });
    }
  };

  return (
    <>
      <Formik
        validationSchema={loginScheme}
        initialValues={{ email: '', password: '' }}
        onSubmit={(event) => onSubmitHandler(event)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <Container component='main' maxWidth='lg'>
            <CssBaseline />
            <Paper elevation={3} sx={{ width: 1152, height: 704 }}>
              <Grid container height={'100%'}>
                <Grid item xs={6} padding={3}>
                  <Grid container>
                    <Grid item xs={12}>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        width={100}
                        alignItems={'center'}
                      >
                        <img src='/favicon.png' width={90}></img>
                        <Typography fontWeight={'bold'} fontSize={'1.3rem'}>
                          CupiDoor
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='h4' fontWeight={'bold'}>
                          Welcome Back!
                        </Typography>
                      </Box>
                      <Box display={'flex'} justifyContent={'center'}>
                        <Typography variant='subtitle1' color={'#A9A9A9'}>
                          Let's Find Your Next Tenant Or Apartment
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box component={'form'} noValidate onSubmit={handleSubmit}>
                        <TextField
                          type='email'
                          name='email'
                          id='email'
                          value={values.email}
                          margin='normal'
                          required
                          fullWidth
                          label='Email Address'
                          autoComplete='email'
                          autoFocus
                          onChange={handleChange}
                        />
                        {errors?.email && <CustomHelperText>{errors.email}</CustomHelperText>}
                        <TextField
                          name='password'
                          id='password'
                          type='password'
                          label='Password'
                          value={values.password}
                          margin='normal'
                          required
                          fullWidth
                          autoComplete='current-password'
                          onChange={handleChange}
                        />
                        {errors?.password && <CustomHelperText>{errors.password}</CustomHelperText>}

                        <Button
                          type='submit'
                          disabled={isLoading}
                          startIcon={
                            isLoading ? (
                              <CircularProgress size={14}></CircularProgress>
                            ) : (
                              <LockIcon></LockIcon>
                            )
                          }
                          fullWidth
                          variant='contained'
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box display={'flex'} justifyContent={'space-between'} paddingX={3}>
                        <Link href='#' variant='body2'>
                          Forgot password?
                        </Link>
                        <Typography variant='body2'>
                          Don't have an account?
                          <Link
                            variant='body2'
                            sx={{ px: 1, cursor: 'pointer' }}
                            onClick={onTogglePage}
                          >
                            Sign Up
                          </Link>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    backgroundImage: 'url(/signIn.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></Grid>
              </Grid>
            </Paper>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default SignInPage;
