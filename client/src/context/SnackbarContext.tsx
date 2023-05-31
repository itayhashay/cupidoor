import React, { useState } from "react";
import { ISnackBar } from "../types/SnackBarType";

type SnackbarContextType = {
  snackBarState: ISnackBar;
  setSnackBarState: React.Dispatch<React.SetStateAction<ISnackBar>>;
};

const SnackbarContext = React.createContext<SnackbarContextType>({
  snackBarState: {} as ISnackBar,
  setSnackBarState: () => {},
});

export default SnackbarContext;

export function useSnackbar() {
  return React.useContext(SnackbarContext);
}

type Props = { children: React.ReactNode };

export const SnackbarContextProvider: React.FC<Props> = ({ children }) => {
  const [snackBarState, setSnackBarState] = useState<ISnackBar>({
    message: "",
    duration: 3000,
    severity: "info",
    show: false,
  });

  return (
    <SnackbarContext.Provider value={{ snackBarState, setSnackBarState }}>
      {children}
    </SnackbarContext.Provider>
  );
};
