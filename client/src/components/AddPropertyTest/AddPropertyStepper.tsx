import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import AddressForm from './AddressForm';
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';
import UploadsForm from './UploadsForm';
import CupidoorSpinner from '../CupidoorSpinner';
import { StepperApartment, UploadedImage } from './types';
import { STEPS } from './constants';
import { useFormikContext } from 'formik';

const AddPropertyStepper = ({
  uploadedImages,
  setUploadedImages,
}: {
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    values: {},
    handleSubmit,
    isSubmitting,
  } = useFormikContext<StepperApartment>();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveImages = (files: UploadedImage[]) => setUploadedImages(files);

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '1.5rem' }}>
        {STEPS.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {isSubmitting ? (
        <CupidoorSpinner />
      ) : (
        (() => {
          switch (activeStep) {
            case 0:
              return <AddressForm handleNext={handleNext} />;
            case 1:
              return <AboutForm handleNext={handleNext} handleBack={handleBack} />;
            case 2:
              return <PaymentsForm handleNext={handleNext} handleBack={handleBack} />;
            case 3:
              return (
                <UploadsForm
                  saveImages={handleSaveImages}
                  uploadedImages={uploadedImages}
                  handleBack={handleBack}
                  handleSubmit={handleSubmit}
                />
              );
            default:
              return <AddressForm handleNext={handleNext} />;
          }
        })()
      )}
      <Box
        sx={{ width: 'auto', position: 'absolute', bottom: 0, right: 0, margin: '0 1rem 1rem 0' }}
      >
        {/* <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
        <Button
          variant='contained'
          // disabled={isValidStep}
          onClick={activeStep === STEPS.length - 1 ? handleSubmit : handleNext}
          sx={{ mt: 1, mr: 1 }}
        >
          {activeStep === STEPS.length - 1 ? 'Finish' : 'Continue'}
        </Button> */}
      </Box>
    </Box>
  );
};

export default AddPropertyStepper;
