import { Alert, Snackbar } from "@mui/material";
import { useSnackbar } from "../../context/SnackbarContext";

const SnackbarCupid = () => {
  const { snackBarState, setSnackBarState } = useSnackbar();
  return (
    <Snackbar
      open={snackBarState.show}
      onClose={() => setSnackBarState({ ...snackBarState, ...{ show: false } })}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        severity={snackBarState.severity}
        variant="filled"
        sx={{ width: "100%", marginTop: 3 }}
      >
        {snackBarState.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCupid;
