import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  height: "80vh",
  bgcolor: 'background.paper',
  p: 4,
  border: 0,
  borderRadius: "10px",
  boxShadow: "rgba(226, 226, 226, 0.5) 0px 2px 4px 0px"
};

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
        <Box sx={style}>
          <IconButton sx={{position: "absolute", top: "1rem", left: "1rem", zIndex: 1}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <AddPropertyStepper />
        </Box>
      </Modal>
  );
}

export default AddProperty;