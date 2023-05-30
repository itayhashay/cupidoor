import React, { SetStateAction, useEffect, useState } from "react";
import { SnackBarType } from "../types/SnackBarType";

interface SnackBarState {
  message: string;
  severity: "success" | "info" | "error" ;
  show: boolean;
}

const useSnackBar = () => {
  const [snackBarState, _setSnackBarState] = useState<SnackBarState>({
    message: "",
    severity: "info",
    show: true,
  });

  const setSnackBarState = (state: SnackBarState) => {
    _setSnackBarState(() => ({ ...state }));
  };

  return [snackBarState, setSnackBarState] as const;
};

export default useSnackBar;
