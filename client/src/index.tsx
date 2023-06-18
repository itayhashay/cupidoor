import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { AuthContextProvider } from "./context/AuthContext";
import SnackbarCupid from "./components/Snackbar";
import { SnackbarContextProvider } from "./context/SnackbarContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ConfirmationModalContextProvider } from "./context/ConfirmationModalContext";
import { CupidThemeContextProvider } from "./context/CupidThemeProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CupidThemeContextProvider>
        <ConfirmationModalContextProvider>
          <SnackbarContextProvider>
            <Router>
              <App />
            </Router>
            <SnackbarCupid />
          </SnackbarContextProvider>
        </ConfirmationModalContextProvider>
      </CupidThemeContextProvider>
    </LocalizationProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);
