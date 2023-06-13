import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DIALOG_STYLES } from './constants';

const AddProperty = ({ isOpen, onClose } : { isOpen: boolean, onClose: Function }) => {
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  }

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])

  return (
      <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={DIALOG_STYLES}>
          <IconButton sx={{position: "absolute", top: "1rem", left: "1rem", zIndex: 1}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <AddPropertyStepper handleClose={handleClose} />
        </Box>
      </Modal>
  );
}

export default AddProperty;