import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  TextField,
  Container,
  MenuItem,
  Grid,
  Box,
  Typography,
  CssBaseline,
  Link,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import axios from "axios";
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
  phone: Yup.string().required("Phone number is a required field"),
  age: Yup.string().required("Age is a required field"),
  role: Yup.string().required("Role is a required field"),
});

const theme = createTheme();

const roles = [
  { value: "landlord", label: "Landlord" },
  { value: "tenant", label: "Tenant" },
];

const SignUpPage = ({ onTogglePage }: SignUpPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goodRegistration, setGoodRegistration] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  const onSubmitHandler = (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    age: string;
    role: string;
  }) => {
    // axios
    //   .post("localhost:3000/register", JSON.stringify(userToRegister))
    //   .then((res) => {
    //     console.log(res)
    setGoodRegistration(true);
    setTimeoutId(
      setTimeout(() => {
        navigate(location.state ? location.state.redirect : "/questions");
      }, 1500)
    );
    // })
    //   .catch((err) => console.log(err));
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  if (goodRegistration) {
    return <div>Registration successful!</div>;
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phone: "",
          age: "",
          role: "",
        }}
        onSubmit={(event) => onSubmitHandler(event)}
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
                    <Grid item xs={12}>
                      <TextField
                        name="phone"
                        id="phone"
                        type="number"
                        value={values.phone}
                        required
                        fullWidth
                        label="Phone"
                        onChange={handleChange}
                      />
                    </Grid>
                    <p className={errors?.phone ? "error" : "hide"}>
                      {errors.phone && touched.phone && errors.phone}
                      {""}
                    </p>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="role"
                        id="role"
                        label="Role"
                        value={values.role}
                        onChange={handleChange}
                        select
                        required
                        fullWidth
                      >
                        {roles.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="age"
                        id="age"
                        value={values.age}
                        required
                        fullWidth
                        label="Age"
                        autoComplete="Age"
                        onChange={handleChange}
                      />
                    </Grid>
                    <p className={errors?.role ? "error" : "hide"}>
                      {errors?.role && touched?.role && errors?.role}
                      {""}
                    </p>
                    <p className={errors?.age ? "error" : "hide"}>
                      {errors.age && touched.age && errors.age}
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
