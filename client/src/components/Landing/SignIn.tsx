import { Avatar, Button, CssBaseline, TextField, Box } from "@mui/material";
import { Typography, Container, Link, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import "./SignIn.css";
import { Formik } from "formik";
import * as Yup from "yup";

interface SignInPageProps {
  onTogglePage: () => void;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const theme = createTheme();

const SignInPage = ({ onTogglePage }: SignInPageProps) => {
  const onSubmitHandler = (values: { email: string; password: string }) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    // isUsersQues all good?
    // auth.login
    // .then(navigate(location.state ? location.state.redirect : "/homepage"))
    // : auth.login.then(navigate(location.state ? location.state.redirect : "/questions"))
    alert(JSON.stringify(userData));
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(event) => onSubmitHandler(event)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    type="email"
                    name="email"
                    id="email"
                    value={values.email}
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                  />
                  <p className={errors?.email ? "error" : "hide"}>
                    {errors.email && touched.email && errors.email}{" "}
                  </p>
                  <TextField
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    value={values.password}
                    margin="normal"
                    required
                    fullWidth
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  <p className={errors?.password ? "error" : "hide"}>
                    {errors.password && touched.password && errors.password}{" "}
                  </p>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="" variant="body2" onClick={onTogglePage}>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        )}
      </Formik>
    </>
  );
};

export default SignInPage;
