import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, TextField, Container, MenuItem } from "@mui/material";
import { Grid, Box, Typography, CssBaseline, Link } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik } from "formik";
import { schema, roles, CustomHelperText } from "./SignUpHelpers";
import "./SignUp.css";
import axios from "axios";
interface SignUpPageProps {
  onTogglePage: () => void;
}

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
          <div id="register-wrapper">
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
                <Grid
                  item
                  container
                  direction={"column"}
                  alignItems={"center"}
                  sx={{ height: 30 }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                </Grid>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3, height: 550, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
                      {errors?.firstName && (
                        <CustomHelperText>
                          First name is requird
                        </CustomHelperText>
                      )}
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
                      {errors?.lastName && (
                        <CustomHelperText>{errors.lastName}</CustomHelperText>
                      )}
                    </Grid>
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
                      {errors?.email && (
                        <CustomHelperText>{errors.email}</CustomHelperText>
                      )}
                    </Grid>
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
                      {errors?.password && (
                        <CustomHelperText>{errors.password}</CustomHelperText>
                      )}
                    </Grid>
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
                      {errors?.phone && (
                        <CustomHelperText>{errors.phone}</CustomHelperText>
                      )}
                    </Grid>
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
                      {errors?.role && (
                        <CustomHelperText>{errors.role}</CustomHelperText>
                      )}
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
                      {errors?.age && (
                        <CustomHelperText>{errors.age}</CustomHelperText>
                      )}
                    </Grid>
                  </Grid>
                  <Grid item container alignItems={"flex-end"}>
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
                  </Grid>
                </Box>
              </Box>
            </Container>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUpPage;
