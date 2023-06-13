import { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import AddressForm from "./AddressForm";
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';
import UploadsForm from './UploadsForm';
import CupidoorSpinner from '../CupidoorSpinner';
import { NewApartment } from './types';
import { DEFAULT_NEW_APARTMENT_DATA, STEPS } from './constants';
import { addApartment } from '../../utils/api';
import { AxiosResponse } from 'axios';
import { convertFilePondImagesToBase64 } from '../../utils/base64';

const AddPropertyStepper = ({handleClose} : {handleClose: () => void}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newApartmentData, setNewApartmentData] = useState<NewApartment>(DEFAULT_NEW_APARTMENT_DATA);
  
  const saveChangesOnNext = (values: any) => {
    setNewApartmentData((prev: NewApartment) => { 
      return {...prev, ...values} 
    })
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getUserId = () => {
    const user: any = localStorage.getItem("user");
    if(user) {
      const userData = JSON.parse(user);
      return userData._id;
    }
    return "";

  }

  const handleSubmit = async () => {
    setIsLoading(true);
    newApartmentData.images = convertFilePondImagesToBase64(newApartmentData.images);
    newApartmentData.user = getUserId();
    try {
      console.log(newApartmentData);
      const response: AxiosResponse = await addApartment(newApartmentData);
      console.log(response);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsLoading(false);
      handleClose();
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}  alternativeLabel sx={{ marginBottom: "1.5rem" }}>
        {STEPS.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {isLoading? <CupidoorSpinner /> : (() => {
        switch (activeStep) {
          case 0:
            return <AddressForm apartmentData={newApartmentData} saveChangesOnNext={saveChangesOnNext}/>;
          case 1:
            return <AboutForm apartmentData={newApartmentData} saveChangesOnNext={saveChangesOnNext}/>;
          case 2:
            return <PaymentsForm apartmentData={newApartmentData} saveChangesOnNext={saveChangesOnNext}/>;
          case 3:
            return <UploadsForm apartmentData={newApartmentData} saveChangesOnNext={saveChangesOnNext} />;      
          default:
            return <AddressForm apartmentData={newApartmentData} saveChangesOnNext={saveChangesOnNext}/>;
          }
      })()}
      <Box sx={{ width: "auto",
                position: "absolute",
                bottom: 0,
                right: 0,
                margin: "0 1rem 1rem 0" }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={activeStep === STEPS.length - 1 ? handleSubmit: handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {activeStep === STEPS.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
              </Box>
    </Box>
  );
};

export default AddPropertyStepper;