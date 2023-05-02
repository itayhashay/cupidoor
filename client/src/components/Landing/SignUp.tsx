import React from "react";
import { Avatar, Button, TextField, Link, Container } from "@mui/material";
import { Grid, Box, Typography, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";

interface SignUpPageProps {
  onTogglePage: () => void;
}

const schema = Yup.object().shape({
  firstName: Yup.string().required("First name is a required field"),
  lastName: Yup.string().required("Last name is a required field"),
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const theme = createTheme();

const SignUpPage = ({ onTogglePage }: SignUpPageProps) => {
  const onSubmitHandler = () => {
    // If good submit and registerd -> refer to http://localhost:3000/qustions
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={onSubmitHandler}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="firstName"
                        id="firstName"
                        value={values.firstName}
                        autoComplete="given-name"
                        required
                        fullWidth
                        label="First Name"
                        autoFocus
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="lastName"
                        id="lastName"
                        value={values.lastName}
                        required
                        fullWidth
                        label="Last Name"
                        autoComplete="family-name"
                        onChange={handleChange}
                      />
                    </Grid>
                    <p className={errors?.firstName ? "error" : "hide"}>
                      {errors.firstName &&
                        touched.firstName &&
                        errors.firstName}
                      {""}
                    </p>
                    <p className={errors?.lastName ? "error" : "hide"}>
                      {errors?.lastName &&
                        touched?.lastName &&
                        errors?.lastName}
                      {""}
                    </p>
                    <Grid item xs={12}>
                      <TextField
                        id="email"
                        name="email"
                        type="email"
                        value={values.email}
                        required
                        fullWidth
                        label="Email Address"
                        autoComplete="email"
                        onChange={handleChange}
                      />
                    </Grid>
                    <p className={errors?.email ? "error" : "hide"}>
                      {errors.email && touched.email && errors.email}
                      {""}
                    </p>
                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        id="password"
                        type="password"
                        value={values.password}
                        required
                        fullWidth
                        label="Password"
                        autoComplete="new-password"
                        onChange={handleChange}
                      />
                    </Grid>
                    <p className={errors?.password ? "error" : "hide"}>
                      {errors.password && touched.password && errors.password}
                      {""}
                    </p>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Link variant="body2" onClick={onTogglePage}>
                        Already have an account? Sign in
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

export default SignUpPage;