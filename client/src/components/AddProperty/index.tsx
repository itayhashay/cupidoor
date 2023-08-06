import { Box, Modal, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DIALOG_STYLES } from './constants';
import { Apartment } from '../../types/apartment';

const AddProperty = ({
  isOpen,
  onClose,
  handleSave,
  houseData,
  isEdit = false,
}: {
  isOpen: boolean;
  handleSave?: () => void;
  onClose: Function;
  houseData?: Apartment;
  isEdit?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleStepperClose = (flag?: boolean) => {
    if (flag && handleSave) {
      handleSave();
    }
    handleClose();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={DIALOG_STYLES}>
        <IconButton
          sx={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <AddPropertyStepper
          handleClose={handleStepperClose}
          houseData={houseData}
          isEdit={isEdit}
        />
      </Box>
    </Modal>
  );
};

export default AddProperty;
