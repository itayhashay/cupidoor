import React, { useEffect, useState, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import {
  Button,
  TextField,
  Container,
  MenuItem,
  Paper,
  Avatar,
  IconButton,
} from "@mui/material";
import { Grid, Box, Typography, CssBaseline, Link } from "@mui/material";
import { Formik } from "formik";
import { schema, roles, CustomHelperText } from "./AuthHelpers";
import "./SignUp.css";
import { AuthContextType, useAuth } from "../../context/AuthContext";
import { UserTypes } from "../../types/user";
import { useSnackbar } from "../../context/SnackbarContext";
import { convertFileToBase64 } from "../../utils/base64";
import { FileUploadOutlined } from "@mui/icons-material";
interface SignUpPageProps {
  onTogglePage: () => void;
}

const SignUpPage = ({ onTogglePage }: SignUpPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const { signUpUser } = useAuth() as AuthContextType;
  const { snackBarState, setSnackBarState } = useSnackbar();
  const [showAvatarError, setShowAvatarError] = useState(false);

  const handleFileChange = async (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const file = (event.target as any).files[0];
    try {
      const base64: string = await convertFileToBase64(file);
      setBase64Image(base64);
      setSelectedImage(base64);
    } catch (ex) {
      setSnackBarState({
        severity: "error",
        message: "Couldn't upload image!",
        show: true,
      });
    }
  };

  const validateProfilePicture = () => {
    if (!base64Image) {
      setShowAvatarError(true);
      return;
    }else{
      setShowAvatarError(false);
    }
  };

  const onSubmitHandler = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    age: string;
    password: string;
    phone: string;
    role: string;
    description?: string;
    answeredQuestions?: boolean;
  }) => {
    if(!base64Image)return;
    let userRole: UserTypes = values.role as UserTypes;
    const { firstName, lastName, email, password, phone, age } = values;
    const response: any = await signUpUser({
      firstName,
      lastName,
      email,
      password,
      phone,
      age,
      avatar:base64Image,
      role: userRole
    });
    if (response.success) {
      setSnackBarState({
        severity: "success",
        message: "Welcome To CupiDoor!",
        show: true,
      });
      navigate(location.state ? location.state.redirect : "/questions");
    } else {
      setSnackBarState({
        severity: "error",
        message: "Couldn't Sign You Up!",
        show: true,
      });
    }
  };

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
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Paper elevation={3}>
              <Grid container >
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
                      mt: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <Typography variant="h4" fontWeight={"bold"}>
                        Create your account
                      </Typography>
                      <Typography variant="subtitle1" color={"#A9A9A9"}>
                        Let's get started with your account
                      </Typography>
                    </Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Avatar
                        alt="User's avatar"
                        sx={{ height: 70, width: 70, mb: 1 }}
                        src={
                          selectedImage
                            ? String(selectedImage)
                            : "/login-icon.jpg"
                        }
                      />{" "}
                      <IconButton

                        sx={{
                          color: "black",
                          ":hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
                        }}
                        component="label"
                      >
                     <FileUploadOutlined></FileUploadOutlined>
                        <input
                          id="avatar"
                          name="avatar"
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={handleFileChange}
                        />
                      </IconButton>
                      {showAvatarError && (
                        <CustomHelperText>
                          {"Please upload a profile picture"}
                        </CustomHelperText>
                      )}
                    </Box>
                    <div className="hidden-browse"></div>

                    <Grid container spacing={1}>
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
                        onClick={validateProfilePicture}
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
          </Container>
        )}
      </Formik>
    </>
  );
};

export default SignUpPage;
