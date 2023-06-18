import { Theme, ThemeProvider, createTheme } from "@mui/material";
import React, { useState, useRef, useContext } from "react";

declare module "@mui/material/styles" {
  interface Theme {
    severity: {
      error: { main: string; text: string };
      info: { main: string; text: string };
      warning: { main: string; text: string };
      success: { main: string; text: string };
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    severity?: {
      error?: { main: string; text: string };
      info?: { main: string; text: string };
      warning?: { main: string; text: string };
      success?: { main: string; text: string };
    };
  }
}

const CupidThemeContext = React.createContext<{ theme: Theme }>(
  {} as { theme: Theme }
);

export default CupidThemeContext;

// export function useConfirmationModal() {
//   return React.useContext(CupidThemeContext);
// }

type Props = { children: React.ReactNode };

export const CupidThemeContextProvider: React.FC<Props> = ({ children }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#20283E",
        light: "#488A99",
        dark: "#242444",
        contrastText: "white",
        
      },
      secondary: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
    severity: {
      success: { main: "#2e7d32", text: "#ffffff" },
      error: { main: "#EF5350", text: "#ffffff" },
      info: { main: "#0288d1", text: "#ffffff" },
      warning: { main: "#ed6c02", text: "#ffffff" },
    },
  });

  return (
    <CupidThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CupidThemeContext.Provider>
  );
};

export const useCupidThemeProvider = (): { theme: Theme } =>
  useContext(CupidThemeContext);
