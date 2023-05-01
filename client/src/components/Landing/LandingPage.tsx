import { useState } from "react";
import "./LandingPage.css";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";

const LandingPage = () => {
  const [isUserRegisterd, setIsUserRegistered] = useState<boolean>(false);
  const togglePage = (): void => {
    setIsUserRegistered((prevIsUserRegisterd) => !prevIsUserRegisterd);
  };

  return (
    <div id="landing-layout">
      {isUserRegisterd ? (
        <SignInPage onTogglePage={togglePage} />
      ) : (
        <SignUpPage onTogglePage={togglePage} />
      )}
    </div>
  );
};

export default LandingPage;
