import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import {
  Avatar,
  Button,
  TextField,
  Container,
  MenuItem,
  Paper,
} from "@mui/material";
import { Grid, Box, Typography, CssBaseline, Link } from "@mui/material";
import { Formik } from "formik";
import { schema, roles, CustomHelperText } from "./AuthHelpers";
import "./SignUp.css";
import axios, { AxiosResponse } from "axios";
import Logo from "../../icons/logo.png";
import { LogoImg } from "../Navbar/styles";
import { AuthContextType, useAuth } from "../../context/AuthContext";
import { UserTypes } from "../../types/user";
interface SignUpPageProps {
  onTogglePage: () => void;
}

const SignUpPage = ({ onTogglePage }: SignUpPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [goodRegistration, setGoodRegistration] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();
  const { signUpUser } = useAuth() as AuthContextType;

  const onSubmitHandler = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    age: string;
    role: string;
  }) => {
    let userRole: UserTypes = values.role as UserTypes;
    const { firstName, lastName, email, password, phone, age, role } = values;
    const response: any = await signUpUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
      role: userRole,
    });
    if (response.success) {
      setGoodRegistration(true);
      alert("Success");
      // setTimeoutId(
      //   setTimeout(() => {
      //     navigate(location.state ? location.state.redirect : "/questions");
      //   }, 1500)
      // );
    } else {
      alert(response.error);
    }

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
          <div>
            <Container component="main" maxWidth="lg">
              <CssBaseline />
              <Paper elevation={3}>
                <Grid container>
                  <Grid item xs={6} padding={3}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      width={100}
                      alignItems={"center"}
                    >
                      <img src="/favicon.png" width={90}></img>
                      <Typography
                        fontWeight={"bold"}
                        fontFamily={"Roboto sans-serif"}
                        fontSize={"1.3rem"}
                      >
                        CupiDoor
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{
                        mt: 3,
                        height: 640,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box display={"flex"} justifyContent={"center"}>
                        <Typography variant="h4" fontWeight={"bold"}>
                          Create your account
                        </Typography>
                      </Box>
                      <Box display={"flex"} justifyContent={"center"}>
                        <Typography variant="subtitle1" color={"#A9A9A9"}>
                          Let's get started with your account
                        </Typography>
                      </Box>

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
                              {errors.firstName}
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
                            <CustomHelperText>
                              {errors.lastName}
                            </CustomHelperText>
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
                            <CustomHelperText>
                              {errors.password}
                            </CustomHelperText>
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
                            {roles.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
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
                          startIcon={<LockIcon></LockIcon>}
                        >
                          Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                          <Grid item>
                            <Typography variant="body2">
                              Already have an account?
                              <Link
                                variant="body2"
                                onClick={onTogglePage}
                                sx={{ cursor: "pointer", px: 1 }}
                              >
                                Sign in
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      backgroundImage: "url(/signUp.jpg)",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                        t.palette.mode === "light"
                          ? t.palette.grey[50]
                          : t.palette.grey[900],
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></Grid>
                </Grid>
              </Paper>

              <Grid container direction={"column"}>
                <Grid item alignItems={"center"} sx={{ height: 89 }}></Grid>
              </Grid>
            </Container>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUpPage;
