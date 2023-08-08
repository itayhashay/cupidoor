import { useEffect, useState } from 'react';
import { Button, Box, Stepper, Step, StepLabel, Grid, Stack, Divider } from '@mui/material';
import AddressForm from "./AddressForm";
import AboutForm from './AboutForm';
import PaymentsForm from './PaymentsForm';
import UploadsForm from './UploadsForm';
import CupidoorSpinner from '../CupidoorSpinner';
import { StepperApartment, UploadedImage } from './types';
import { DEFAULT_NEW_APARTMENT_DATA, STEPS } from './constants';
import useAPI from '../../hooks/useAPI';
import { AxiosResponse } from 'axios';
import { convertFilePondImagesToBase64 } from '../../utils/base64';
import { getUserId } from '../../utils/localStorage';
import { useNavigate } from "react-router-dom";
import { Apartment } from '../../types/apartment';

const AddPropertyStepper = ({handleClose, houseData, isEdit} : {handleClose: (flag?:boolean) => void, houseData?: Apartment, isEdit: boolean}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newApartmentData, setNewApartmentData] = useState<StepperApartment>(DEFAULT_NEW_APARTMENT_DATA);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]) 

  const navigate = useNavigate();
  const {addApartment, editApartment} = useAPI();

  useEffect(() => {
    houseData && setNewApartmentData({...houseData , newImages: [], removedImages: []} as StepperApartment);
  }, [houseData]);

  const saveChangesOnNext = (values: any) => {
    setNewApartmentData((prev: StepperApartment) => { 
      return {...prev, ...values} 
    })
  }
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(uploadedImages)
    newApartmentData.user = getUserId();
    newApartmentData.newImages = uploadedImages.map((image: UploadedImage) => image.base64);

    console.log(newApartmentData);
    try {
      if(isEdit) {
        const response: AxiosResponse = await editApartment(newApartmentData);
        response.status === 201 && navigate(`/apartment/${response.data._id}`);
      } else {
        console.log("NOT EDIT")
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

  return (
    <Stack height={'100%'}>
      <Grid container>
        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: '1.5rem' }}>
            {STEPS.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Divider></Divider>
        </Grid>
        <Grid item xs={12} mt={3}>
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
                    />
                  );
                case 1:
                  return (
                    <AboutForm
                      apartmentData={newApartmentData}
                      saveChangesOnNext={saveChangesOnNext}
                    />
                  );
                case 2:
                  return (
                    <PaymentsForm
                      apartmentData={newApartmentData}
                      saveChangesOnNext={saveChangesOnNext}
                    />
                  );
                case 3:
                  return (
                    <UploadsForm
                      apartmentData={newApartmentData}
                      saveImages={(files: UploadedImage[]) => setUploadedImages(files)}
                      uploadedImages={uploadedImages}
                    />
                  );
                default:
                  return (
                    <AddressForm
                      apartmentData={newApartmentData}
                      saveChangesOnNext={saveChangesOnNext}
                    />
                  );
              }
            })()
          )}
        </Grid>
      </Grid>
      <Box display={'flex'} justifyContent={'flex-end'} mt={'auto'}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button
          variant='contained'
          sx={{ ml: 2 }}
          onClick={activeStep === STEPS.length - 1 ? handleSubmit : handleNext}
        >
          {activeStep === STEPS.length - 1 ? 'Finish' : 'Continue'}
        </Button>
      </Box>
    </Stack>
  );
};

export default AddPropertyStepper;