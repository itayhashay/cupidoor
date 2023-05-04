import { useState } from "react";
import "./LandingPage.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";

const theme = createTheme();

const LandingPage = () => {
  const [isUserRegisterd, setIsUserRegistered] = useState<boolean>(false);
  const togglePage = (): void => {
    setIsUserRegistered((prevIsUserRegisterd) => !prevIsUserRegisterd);
  };

  return (
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
