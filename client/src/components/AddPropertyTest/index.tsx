import { useEffect, useState } from 'react';
import AddPropertyStepper from './AddPropertyStepper';
import { AppBar, Dialog, DialogActions, DialogContent, Grid } from '@mui/material';
import { Box, IconButton, Toolbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DEFAULT_NEW_APARTMENT_DATA } from './constants';
import { Apartment } from '../../types/apartment';
import { Formik } from 'formik';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserId } from '../../utils/localStorage';
import { StepperApartment, UploadedImage } from './types';
import useAPI from '../../hooks/useAPI';
import { ApartmentSchema } from '../../utils/FormikSchema';

const AddProperty = ({
  isOpen,
  onClose,
  handleSave,
  houseData,
  isEdit = false,
}: {
  isOpen: boolean;
  handleSave?: VoidFunction;
  onClose: Function;
  houseData?: Apartment;
  isEdit?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const navigate = useNavigate();
  const { addApartment, editApartment,setApartmentAnswers } = useAPI();

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleStepperClose = (flag?: boolean) => {
    if (flag && handleSave) {
      handleSave();
    }
    handleClose();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const formikValues = houseData
    ? ({ ...houseData, newImages: [], removedImages: [] } as StepperApartment)
    : DEFAULT_NEW_APARTMENT_DATA;

  const handleSubmit = async (houseData: StepperApartment) => {
    const houseDataToSave = {
      ...houseData,
      user: getUserId(),
      newImages: uploadedImages.map((image: UploadedImage) => image.base64),
    };

    try {
      if (isEdit) {
        const response: AxiosResponse = await editApartment(houseDataToSave);
        response.status === 201 && navigate(`/apartment/${response.data._id}`);
      } else {
        console.log('NOT EDIT');
        const response: AxiosResponse = await addApartment(houseDataToSave);
        if(response.status === 201 && houseData.answers){
          const answerResponse = await setApartmentAnswers(response.data._id,houseData.answers);
        }
        response.status === 201 && navigate(`/apartment/${response.data._id}`);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error };
    } finally {
      handleStepperClose(true);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullWidth>
      <AppBar sx={{ position: 'relative' }} elevation={0}>
        <Toolbar sx={{ bgcolor: 'primary.light' }}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
            >
              <Typography variant='body1' color={'white'} textAlign={'center'} fontSize={'1.5rem'}>
                Property Form
              </Typography>
            </Box>

            <IconButton onClick={handleClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} overflow={'auto'} height={850}>
            <Formik
              validationSchema={ApartmentSchema}
              initialValues={formikValues}
              onSubmit={handleSubmit}
            >
              <AddPropertyStepper
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                // handleClose={handleStepperClose}
                // houseData={houseData}
                isEdit={isEdit}
              />
            </Formik>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default AddProperty;
