import { useEffect, useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import AddressForm from "./AddressForm";
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';
import UploadsForm from './UploadsForm';

type NewApartment = {
  city: string;
  street: string;
  houseNumber: number;
  propertyCondition: string;
  houseArea: number;
  rooms: number;
  floor: number;
  parkings: number;
  balconies: number;
  description: string;
  accessible: boolean,
  boiler: boolean,
  furnished: boolean,
  airConditioner: boolean,
  bars: boolean,
  elevator: boolean,
  garage: boolean,
  longTerm: boolean,
  shelter: boolean,
}

const DEFAULT_NEW_APARTMENT_DATA: NewApartment = {
  city: "",
  street: "",
  houseNumber: 0,
  propertyCondition: "",
  houseArea: 0,
  rooms: 0,
  floor: 0,
  parkings: 0,
  balconies: 0,
  description: "",
  accessible: false,
  boiler: false,
  furnished: false,
  airConditioner: false,
  bars: false,
  elevator: false,
  garage: false,
  longTerm: false,
  shelter: false,
}

const AddPropertyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [newApartmentData, setNewApartmentData] = useState<NewApartment>(DEFAULT_NEW_APARTMENT_DATA);
  const saveChangesOnNext = (values: any) => {
    setNewApartmentData((prev: NewApartment) => { return {...prev, values} })
  }

  const steps: string[] = [
    "Property Address",
    "About The Property",
    "Payments",
    "Photos and Videos",
  ]
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: "1.5rem" }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {(() => {
        switch (activeStep) {
          case 0:
            return <AddressForm activeStep={activeStep} saveChangesOnNext={saveChangesOnNext}/>;
          case 1:
            return <AboutForm activeStep={activeStep} saveChangesOnNext={saveChangesOnNext}/>;
          case 2:
            return <PaymentsForm activeStep={activeStep} saveChangesOnNext={saveChangesOnNext}/>;
          case 3:
            return <UploadsForm activeStep={activeStep} saveChangesOnNext={saveChangesOnNext}/>;      
          default:
            return <AddressForm activeStep={activeStep} saveChangesOnNext={saveChangesOnNext}/>;
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
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
              </Box>
    </Box>
  );
};

export default AddPropertyStepper;