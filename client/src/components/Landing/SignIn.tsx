import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Box } from "@mui/material";
import { Typography, Container, Link, Grid, Paper } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { schema, CustomHelperText } from "./AuthHelpers";
import { Formik } from "formik";
import "./SignIn.css";

interface SignInPageProps {
  onTogglePage: () => void;
}

const SignInPage = ({ onTogglePage }: SignInPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isGoodLogin, setIsGoodLogin] = useState<boolean>(false);
  const [loginTimeoutId, setLoginTimeoutId] = useState<
    NodeJS.Timeout | undefined
  >();

  const onSubmitHandler = (values: { email: string; password: string }) => {
    const userData = {
      email: values.email,
      password: values.password,
    };
    // isUsersQues all good?
    // auth.login
    // .then(navigate(location.state ? location.state.redirect : "/home"))
    // : auth.login.then(navigate(location.state ? location.state.redirect : "/questions"))
    alert(JSON.stringify(userData));
    setIsGoodLogin(true);
    setLoginTimeoutId(
      setTimeout(() => {
        navigate(location.state ? location.state.redirect : "/home");
      }, 1500)
    );
  };

  useEffect(() => {
    return () => {
      if (loginTimeoutId) {
        clearTimeout(loginTimeoutId);
      }
    };
  }, [loginTimeoutId]);

  if (isGoodLogin) {
    return <div>Logged good! redirecting you...</div>;
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(event) => onSubmitHandler(event)}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div>
            <Container component="main" maxWidth="lg">
              <CssBaseline />
              <Paper elevation={3} sx={{ width: 600, height: 300 }}>
                <Grid container>
                  <Grid item xs={6} padding={3}>
                    <Box component={"form"} onSubmit={handleSubmit} noValidate>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
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
                          {errors?.email && (
                            <CustomHelperText>{errors.email}</CustomHelperText>
                          )}
                        </Grid>
                        <Grid item xs={12}>
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
                          {errors?.password && (
                            <CustomHelperText>
                              {errors.password}
                            </CustomHelperText>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      backgroundImage: "url(/illustration.png)",
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
              <Paper elevation={3}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid container spacing={2}>
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
                        {errors?.email && (
                          <CustomHelperText>{errors.email}</CustomHelperText>
                        )}
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
                        {errors?.password && (
                          <CustomHelperText>{errors.password}</CustomHelperText>
                        )}
                      </Grid>
                      <Grid item container alignItems={"flex-end"}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                        <Grid container justifyContent={"center"}>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              Forgot password?
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link
                              href=""
                              variant="body2"
                              onClick={onTogglePage}
                            >
                              {"Don't have an account? Sign Up"}
                            </Link>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      backgroundImage: "url(/illustration.png)",
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
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignInPage;
