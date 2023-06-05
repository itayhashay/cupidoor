import { useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import AddressForm from "./AddressForm";
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';

const AddPropertyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps: {
    index: number,
    label: string;
    component: JSX.Element;
}[] = [{
    index: 1,
    label: "Property Address",
    component: <AddressForm />
  },{
    index: 2,
    label: "About The Property",
    component: <AboutForm />
  },{
    index: 3,
    label: "Payments",
    component: <PaymentsForm />
  },{
    index: 4,
    label: "Photos and Videos",
    component: <AddressForm />
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
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
              </Box>
    </Box>
  );
};

export default AddPropertyStepper;