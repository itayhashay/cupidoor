import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import MainRouter from "./components/routing/MainRouter";
import { AuthContextProvider } from "./context/AuthContext";
import SnackbarCupid from "./components/Snackbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <MainRouter />
      </Router>
      <SnackbarCupid></SnackbarCupid>
    </AuthContextProvider>
  </React.StrictMode>
);
