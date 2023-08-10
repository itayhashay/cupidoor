import { Box, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { DEFAULT_NEW_APARTMENT_DATA, DIALOG_STYLES } from './constants';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import AddPropertyStepper from './AddPropertyStepper';
import { Apartment } from '../../types/apartment';
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
  const { addApartment, editApartment } = useAPI();

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
    console.log('submitting');
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
    <Modal open={open} onClose={handleClose}>
      <Box sx={DIALOG_STYLES}>
        <IconButton
          sx={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 1 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Formik
          validationSchema={ApartmentSchema}
          initialValues={formikValues}
          onSubmit={handleSubmit}
        >
          <AddPropertyStepper
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddProperty;
