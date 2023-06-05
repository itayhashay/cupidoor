import { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import AddressForm from "./AddressForm";
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';
import UploadsForm from './UploadsForm';

const AddPropertyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps: {
    label: string;
    component: JSX.Element;
}[] = [{
    label: "Property Address",
    component: <AddressForm />
  },{
    label: "About The Property",
    component: <AboutForm />
  },{
    label: "Payments",
    component: <PaymentsForm />
  },{
    label: "Photos and Videos",
    component: <UploadsForm />
  }];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getActiveStepComponent = () => {
    const activeStepObj = steps[activeStep];
    return activeStepObj ? activeStepObj.component : <>Not Found</>;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: "1.5rem" }}>
        {steps.map(({label}, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {getActiveStepComponent()}
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