import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';
import { AppBar, Dialog, DialogActions, DialogContent, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DIALOG_STYLES } from './constants';
import { Apartment } from '../../types/apartment';

const AddProperty = ({ isOpen, onClose,handleSave, houseData, isEdit = false} : { isOpen: boolean,handleSave?:()=>void, onClose: Function, houseData?: Apartment, isEdit?: boolean }) => {
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
    onClose();
    
  }

  const handleStepperClose = (flag?: boolean) => {
    if(flag && handleSave){
      handleSave();
    }
    handleClose();
     
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen])

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullWidth>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar sx={{ bgcolor: 'primary.light' }}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
            >
              <Typography variant='body1' color={'white'} textAlign={'center'} fontSize={'1.5rem'}>
                Property Form
              </Typography>
            </Box>

            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container height={'76vh'}>
          <Grid item xs={12} overflow={'auto'} height={'auto'}>
            <AddPropertyStepper
              handleClose={handleStepperClose}
              houseData={houseData}
              isEdit={isEdit}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default AddProperty;