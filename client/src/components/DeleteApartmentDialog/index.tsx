import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { Apartment } from "../../types/apartment";
import useAPI from "../../hooks/useAPI";
import { useSnackbar } from "../../context/SnackbarContext";

const DeleteApartmentDialog = ({
  apartmentDetails,
  handleClose,
}: {
  apartmentDetails: Apartment;
  handleClose: () => void;
}) => {

    const {deleteApartment} = useAPI();
    const {setSnackBarState} = useSnackbar();
    const handleDeleteApartment = async ()=>{
        try{
            await deleteApartment(apartmentDetails._id);
            setSnackBarState({
                show: true,
                message: "Apartment deleted successfully!",
                severity: 'success',
              });
            handleClose();
        }catch(ex){
            setSnackBarState({
              show: true,
              message: "Couldn't delete apartment!",
              severity: 'error',
            });
        }
        
    }
  return (
    <Dialog open={true}>
      <DialogTitle bgcolor={"#f44336"} color={"white"}>Delete Apartment</DialogTitle>
      <DialogContent >
        <DialogContentText sx={{padding:1,color:"black"}}>
          Are you sure you want to delete {apartmentDetails.city}, {apartmentDetails.street} {apartmentDetails.houseNumber}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={handleDeleteApartment}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteApartmentDialog;