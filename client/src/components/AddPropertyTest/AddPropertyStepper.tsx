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
import { STEPS } from './constants';
import useAPI from '../../hooks/useAPI';
import QuestionsStepper from '../QuestionsStepper';
import { QUESTIONS_STATE } from '../QuestionsStepper/constant';
import { QuestionAnswer } from '../../types/questionAnswer';
import CloseIcon from '@mui/icons-material/Close';
import { useFormikContext } from 'formik';

const AddPropertyStepper = ({
  isEdit,
  uploadedImages,
  setUploadedImages,
}: {
  isEdit: boolean;
  uploadedImages: UploadedImage[];
  setUploadedImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    values: {},
    handleSubmit,
    isSubmitting,
    setFieldValue
  } = useFormikContext<StepperApartment>();

  const handleNext = () => {
    if(activeStep + 1 === STEPS.length -1 && isEdit){
      handleSubmit();
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSaveImages = (files: UploadedImage[]) => setUploadedImages(files);

  // #############################################################
  // ------>>> New part Afik added <<< ------ //
  const handleSaveQuestions = (answers: QuestionAnswer[]) => {
    setFieldValue('answers', answers);
    handleSubmit();
    // handleSubmit(answers);
  };
  // #############################################################

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
                      handleNext={handleNext}
                      handleSubmit={handleSubmit}
                    />
                  );
                case 4:
                  return (
                    <>
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
                                submitFormik={handleSubmit}
                              />
                            </Grid>
                          </Grid>
                        </DialogContent>
                      </Dialog>
                    </>
                  );
                default:
                  return <AddressForm handleNext={handleNext} />;
              }
            })()
          )}
        </Grid>
      </Grid>
      {/* <Box display={'flex'} justifyContent={'flex-end'} mt={'auto'}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep !== STEPS.length - 1 && (
          <Button variant='contained' sx={{ ml: 2 }} onClick={handleNext}>
            {activeStep === STEPS.length - 1 ? 'Finish' : 'Continue'}
          </Button>
        )}
      </Box> */}
    </Stack>
  );
};

export default AddPropertyStepper;
