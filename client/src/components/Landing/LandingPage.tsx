import { useState } from "react";
import "./LandingPage.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const theme = createTheme();

const LandingPage = () => {
  const [isUserRegisterd, setIsUserRegistered] = useState<boolean>(true);
  const togglePage = (): void => {
    setIsUserRegistered((prevIsUserRegisterd) => !prevIsUserRegisterd);
  };
  const { isAuthLoading, user } = useAuth();

  // if (isAuthLoading) return null;
  return user?._id ? (
    <Navigate to={"/home/all-apartments"} replace></Navigate>
  ) : (
    <ThemeProvider theme={theme}>
      <div id="landing-layout">
        {isUserRegisterd ? (
          <SignInPage onTogglePage={togglePage} />
        ) : (
          <SignUpPage onTogglePage={togglePage} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;
