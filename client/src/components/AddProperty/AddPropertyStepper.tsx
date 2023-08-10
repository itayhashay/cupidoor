import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import AddressForm from './AddressForm';
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';
import UploadsForm from './UploadsForm';
import CupidoorSpinner from '../CupidoorSpinner';
import { StepperApartment, UploadedImage } from './types';
import { DEFAULT_NEW_APARTMENT_DATA, STEPS } from './constants';
import useAPI from '../../hooks/useAPI';
import { getUserId } from '../../utils/localStorage';
import { Apartment } from '../../types/apartment';
import { stepperInputFiedls, stepperSchemas } from './stepsInputs';
import { useFormik } from 'formik';

const AddPropertyStepper = ({
  handleClose,
  houseData,
  isEdit,
}: {
  handleClose: (flag?: boolean) => void;
  houseData?: Apartment;
  isEdit: boolean;
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newApartmentData, setNewApartmentData] = useState<StepperApartment>(
    DEFAULT_NEW_APARTMENT_DATA,
  );
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [isValidStep, setIsValidStep] = useState<boolean>(false);

  const navigate = useNavigate();
  const { addApartment, editApartment } = useAPI();

  useEffect(() => {
    houseData &&
      setNewApartmentData({ ...houseData, newImages: [], removedImages: [] } as StepperApartment);
  }, [houseData]);

  const saveChangesOnNext = (values: any) => {
    setNewApartmentData((prev: StepperApartment) => {
      return { ...prev, ...values };
    });
  };

  let formik = useFormik({
    initialValues: { ...newApartmentData },
    validationSchema: stepperSchemas[activeStep],
    onSubmit: () => {
      return;
    },
  });

  const handleNext = async () => {
    // formik.handleSubmit();
    const isValid = await ValidateCurrentStep();
    // if (isValid) {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const ValidateCurrentStep = async () => {
    try {
      let valuesToCheck = [...stepperInputFiedls[activeStep]];
      console.log('Hey!');
      console.log('I am checking the values...... ', valuesToCheck);
      // await stepperSchemas[activeStep].validate(valuesToCheck, { abortEarly: false });
      await stepperSchemas[activeStep].validate(valuesToCheck);
      console.log('The schema looking for her values of: ', stepperSchemas[activeStep]);
      return {};
    } catch (error) {
      // const errors = {};
      // error?.inner?.forEach((err) => {
      //   errors[err.path] = err.message;
      // });
      // return errors;
      return;
    }
    return true;
  };

  const handleSubmit = async () => {
    const isValid = await ValidateCurrentStep();
    setIsLoading(true);
    if (isValid) {
      newApartmentData.user = getUserId();
      newApartmentData.newImages = uploadedImages.map((image: UploadedImage) => image.base64);
      try {
        if (isEdit) {
          const response: AxiosResponse = await editApartment(newApartmentData);
          response.status === 201 && navigate(`/apartment/${response.data._id}`);
        } else {
          console.log('NOT EDIT');
          const response: AxiosResponse = await addApartment(newApartmentData);
          response.status === 201 && navigate(`/apartment/${response.data._id}`);
        }
        return { success: true };
      } catch (error) {
        return { success: false, error };
      } finally {
        setIsLoading(false);
        handleClose(true);
      }
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '1.5rem' }}>
        {STEPS.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {isLoading ? (
        <CupidoorSpinner />
      ) : (
        (() => {
          switch (activeStep) {
            case 0:
              return (
                <AddressForm
                  apartmentData={newApartmentData}
                  saveChangesOnNext={saveChangesOnNext}
                  handleNext={handleNext}
                />
              );
            case 1:
              return (
                <AboutForm
                  apartmentData={newApartmentData}
                  saveChangesOnNext={saveChangesOnNext}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              );
            case 2:
              return (
                <PaymentsForm
                  apartmentData={newApartmentData}
                  saveChangesOnNext={saveChangesOnNext}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              );
            case 3:
              return (
                <UploadsForm
                  apartmentData={newApartmentData}
                  saveImages={(files: UploadedImage[]) => setUploadedImages(files)}
                  uploadedImages={uploadedImages}
                  handleBack={handleBack}
                  handleSubmit={handleSubmit}
                />
              );
            default:
              return (
                <AddressForm
                  apartmentData={newApartmentData}
                  saveChangesOnNext={saveChangesOnNext}
                  handleNext={handleNext}
                />
              );
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
