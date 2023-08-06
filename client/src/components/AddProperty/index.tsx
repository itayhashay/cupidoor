import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';
import { IconButton, Tab, Tabs, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DIALOG_STYLES } from './constants';
import { Apartment } from '../../types/apartment';
import QuestionsStepper from '../QuestionsStepper';
import { QUESTIONS_STATE } from '../QuestionsStepper/constant';

const AddProperty = ({ isOpen, onClose,handleSave, houseData, isEdit = false} : { isOpen: boolean,handleSave?:()=>void, onClose: Function, houseData?: Apartment, isEdit?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [propertyId, setPropertyId] = useState<number>(-1);
  const [tabValue, setTabValue] = useState('details');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
    
  }

  const handleNextStep = (apartmentId: number) => {
    setPropertyId(apartmentId);
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

  const renderEditProperty = () => 
          <Box>
            <Box display={'flex'} alignItems={'center'} marginBottom={'2rem'} flexDirection={'column'}>
              <Tabs
                sx={{
                  '.Mui-selected' : {
                    color: '#20283E'
                  }
                }}
                value={tabValue}
                onChange={handleChange}
                indicatorColor="secondary"
                aria-label="secondary tabs example"
              >
                <Tab value="details" label="Property Details" />
                <Tab value="lifeStyle" label="Life Style" />
              </Tabs>
            </Box>
            {tabValue === 'details' ?
            <AddPropertyStepper nextStep={handleNextStep} handleClose={handleStepperClose} houseData={houseData} isEdit={isEdit}/> :
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} margin={'auto'} width={'90%'}>
              <QuestionsStepper displayHouses={()=>{}} state={QUESTIONS_STATE.LANDLORD} propertyId={propertyId} />
            </Box>}
          </Box>;

  return (
      <Modal
        open={open}
        onClose={handleClose}>
        <Box sx={DIALOG_STYLES}>
          <IconButton sx={{position: "absolute", top: "1rem", left: "1rem", zIndex: 1}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {isEdit ? renderEditProperty() :
          propertyId === -1 ?
          <AddPropertyStepper nextStep={handleNextStep} handleClose={handleStepperClose} houseData={houseData} isEdit={isEdit}/> :
          <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} margin={'auto'} width={'90%'}>
            <Typography variant='h5'>Propery Created! Just a few more questions for better matches...</Typography>
            <QuestionsStepper displayHouses={()=>{}} state={QUESTIONS_STATE.LANDLORD} propertyId={propertyId} />
            </Box>}
        </Box>
      </Modal>
  );
}

export default AddProperty;