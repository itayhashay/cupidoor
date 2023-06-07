import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { AuthContextProvider } from "./context/AuthContext";
import SnackbarCupid from "./components/Snackbar";
import { SnackbarContextProvider } from "./context/SnackbarContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
    <AuthContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarContextProvider>
          <Router>
            <App />
          </Router>
          <SnackbarCupid />
        </SnackbarContextProvider>
      </LocalizationProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
