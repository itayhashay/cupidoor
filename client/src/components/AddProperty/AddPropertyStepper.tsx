import { useEffect, useState } from 'react';
import {
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Stack,
  Divider,
  Typography,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import AddressForm from './AddressForm';
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
import { useNavigate } from 'react-router-dom';
import { Apartment } from '../../types/apartment';
import QuestionsStepper from '../QuestionsStepper';
import { QUESTIONS_STATE } from '../QuestionsStepper/constant';
import { QuestionAnswer } from '../../types/questionAnswer';
import CloseIcon from '@mui/icons-material/Close';

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

  const navigate = useNavigate();
  const { addApartment, editApartment, setApartmentAnswers } = useAPI();

  useEffect(() => {
    houseData &&
      setNewApartmentData({ ...houseData, newImages: [], removedImages: [] } as StepperApartment);
  }, [houseData]);

  const saveChangesOnNext = (values: any) => {
    setNewApartmentData((prev: StepperApartment) => {
      return { ...prev, ...values };
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (questionAnswers: QuestionAnswer[]) => {
    setIsLoading(true);
    console.log(uploadedImages);
    newApartmentData.user = getUserId();
    newApartmentData.newImages = uploadedImages.map((image: UploadedImage) => image.base64);

    console.log(newApartmentData);
    try {
      if (isEdit) {
        const response: AxiosResponse = await editApartment(newApartmentData);
        response.status === 201 && navigate(`/apartment/${response.data._id}`);
      } else {
        console.log('NOT EDIT');
        const response: AxiosResponse = await addApartment(newApartmentData);
        if (response.status === 201) {
          const answerResponse = await setApartmentAnswers(response.data._id, questionAnswers);
        }
        response.status === 201 && navigate(`/apartment/${response.data._id}`);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsLoading(false);
      handleClose(true);
    }
  };

  const handleSaveQuestions = (answers: QuestionAnswer[]) => {
    handleSubmit(answers);
  };

  return (
    <Stack height={'100%'}>
      <Grid container>
        {activeStep !== STEPS.length - 1 && (
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
        )}

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
                case 4:
                  return (
                    <Dialog open={true} onClose={handleBack} maxWidth={'lg'} fullWidth>
                      <AppBar sx={{ position: 'relative' }} elevation={0}>
                        <Toolbar sx={{ bgcolor: 'primary.light' }}>
                          <Box display={'flex'} justifyContent={'space-between'}>
                            <Box
                              display={'flex'}
                              justifyContent={'center'}
                              alignItems={'center'}
                              textAlign={'center'}
                            >
                              <Typography
                                variant='body1'
                                color={'white'}
                                textAlign={'center'}
                                fontSize={'1.5rem'}
                              >
                                Property Preferences
                              </Typography>
                            </Box>

                            <IconButton onClick={handleBack} sx={{ color: 'white' }}>
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        </Toolbar>
                      </AppBar>
                      <DialogContent>
                        <Grid container>
                          <Grid item xs={12} overflow={'auto'}>
                            <QuestionsStepper
                              displayHouses={() => {}}
                              state={QUESTIONS_STATE.LANDLORD}
                              handleSaveQuestions={handleSaveQuestions}
                            />
                          </Grid>
                        </Grid>
                      </DialogContent>
                    </Dialog>
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
        {activeStep !== STEPS.length - 1 && (
          <Button variant='contained' sx={{ ml: 2 }} onClick={handleNext}>
            {activeStep === STEPS.length - 1 ? 'Finish' : 'Continue'}
          </Button>
        )}
      </Box>
    </Stack>
  );
};

export default AddPropertyStepper;
