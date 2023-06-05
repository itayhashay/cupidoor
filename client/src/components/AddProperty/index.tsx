import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80vw",
  height: "80vh",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
        onClose={handleClose}
      >
        <Box sx={style}>
          <AddPropertyStepper />
        </Box>
      </Modal>
  );
}

export default AddProperty;