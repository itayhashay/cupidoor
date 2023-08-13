import { Box, Button, Container, Grid, Paper, Typography,Avatar,IconButton } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Apartment } from '../../types/apartment';
import DryDetails from './DryDetails';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ImageContainer } from './styles';
import ImagesGallery from './ImagesGallery';
import { FavoriteBorder } from '@mui/icons-material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import ApartmentFeatures from './ApartmentFeatures';
import { precentToColor } from '../../utils/colors';
import useAPI from '../../hooks/useAPI';
import CupidoorSpinner from '../CupidoorSpinner';
import LandlordSection from './LandlordSection';
import ApartmentDescription from './ApartmentDescription';
import PaymentCalculator from './PaymentCalculator';
import { MatchLabelStyles } from '../HouseCard/styles';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/user';
import LikesSection from './LikesSection';
import { useSnackbar } from '../../context/SnackbarContext';
import { useConfirmationModal } from '../../context/ConfirmationModalContext';
import BackButton from '../BackButton';
import EditIcon from '@mui/icons-material/Edit';
import AddProperty from '../AddProperty';

const ApartmentDetails = () => {
  const [apartmentInfo, setApartmentInfo] = useState<Apartment | null>(null);
  const [matchColor, setMatchColor] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [isMyApartment, setIsMyApartment] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [initiateUpdate,setInitiateUpdate] = useState<boolean>(true);
  const [apartmentLikes, setApartmentLikes] = useState<User[]>([] as User[]);
  const [isLikesLoading, setIsLikesLoading] = useState<boolean>(false);
  const [isLikeActionLoading, setIsLikeActionLoading] = useState<boolean>(false);
  const { setSnackBarState } = useSnackbar();
  const { getApartmentById, toggleTenantLike, getApartmentLikes, approveTenant, declineTenant } =
    useAPI();
  const { user } = useAuth();
  const params = useParams();
  const { showConfirmationModal } = useConfirmationModal();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartmentLikes = async (id: string) => {
      const likes: User[] = await getApartmentLikes(id);
      setApartmentLikes(likes);
      setIsLikesLoading(false);
    };

    const fetchApartmentData = async (id: string) => {
      try{
        const apartment: Apartment = await getApartmentById(id);
        setApartmentInfo(apartment);
        setInitiateUpdate(false);
        if (apartment.user._id === user?._id) {
          setIsLikesLoading(true);
          setIsMyApartment(true);
          fetchApartmentLikes(id);
        }
        setIsFavorite(apartment?.liked as boolean);
        setIsMatched(apartment?.matched as boolean);
      }catch(ex){
        navigate("/404")
      }
     
    };

    const apartmentId: string = params.id || '';

    if (apartmentId && initiateUpdate) {
      fetchApartmentData(apartmentId);
    }
  }, [params.id,initiateUpdate]);

  useEffect(() => {
    const color: string = precentToColor(apartmentInfo?.match || 0);
    setMatchColor(color);
  }, [apartmentInfo]);

  const handleLikeClick = async (apartmentId: string, userId: string) => {
    let flag = true;
    setIsLikeActionLoading(true);
    if (isMatched) {
      flag = await showConfirmationModal({
        message: 'Are you sure you want to unmatch?',
        severity: 'info',
        title: `Unmatch ${apartmentInfo?.city},${apartmentInfo?.street} ${apartmentInfo?.houseNumber}?`,
        show: true,
      });
    }
    if (flag) {
      await toggleTenantLike(apartmentId, userId);
      if (isMatched) {
        return setIsMatched(false);
      }
      setIsFavorite((prev) => !prev);
    }
    setIsLikeActionLoading(false);
  };

  const handleApproveClick = (tenantId: string) => {
    if (apartmentInfo) {
      try {
        approveTenant(tenantId, apartmentInfo?._id);
        setApartmentLikes((prevState) => {
          return prevState.filter((user) => user._id !== tenantId);
        });
      } catch (ex) {
        setSnackBarState({
          severity: 'error',
          message: "Couldn't approve tenant, please try again later!",
          show: true,
        });
      }
    }
  };
  const handleDeclineClick = (tenantId: string) => {
    if (apartmentInfo) {
      try {
        declineTenant(tenantId, apartmentInfo?._id);
        setApartmentLikes((prevState) => {
          return prevState.filter((user) => user._id !== tenantId);
        });
      } catch (ex) {
        setSnackBarState({
          severity: 'error',
          message: "Couldn't decline tenant, please try again later!",
          show: true,
        });
      }
    }
  };

  const handleEditClick = ()=>{
    setIsEditOpen(true);
  }

  const handleSave= ()=>{
    setInitiateUpdate(true);
    setIsEditOpen(false);
    
  }

  if (!apartmentInfo) return <CupidoorSpinner></CupidoorSpinner>;
  return (
    // TODO: Change last updated mock.
    <>
      <Box padding={2}>
        <BackButton></BackButton>
      </Box>

      <Container maxWidth='xl' sx={{ paddingY: 3 }}>
        <Grid container component={Paper} elevation={3}>
          <Grid item xs={12} height={60} padding={2} width={'100%'} bgcolor={'primary.light'}>
            <Box
              display={'flex'}
              color={'white'}
              alignItems={'center'}
              height={'100%'}
              justifyContent={'space-between'}
            >
              <Box display={'flex'} color={'white'} alignItems={'center'}>
                <LocationOnIcon></LocationOnIcon>
                <Typography variant='h5' fontWeight={'bold'} ml={1}>
                  {`${apartmentInfo.city}, ${apartmentInfo.street} ${apartmentInfo.houseNumber}`}
                </Typography>
              </Box>
              {isMyApartment && (
                <IconButton
                  onClick={handleEditClick}
                  sx={{
                    bgcolor: 'primary.dark',
                    '&.MuiIconButton-root:hover': {
                      bgcolor: 'secondary.main',
                    },
                  }}
                >
                  <EditIcon sx={{ color: 'white' }}></EditIcon>
                </IconButton>
              )}
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid container position='relative'>
              <Grid item xs={12}>
                <ImageContainer className='apartment-gallery'>
                  <ImagesGallery
                    images={
                      apartmentInfo.images[0]
                        ? apartmentInfo.images
                        : [{ name: '', _id: '', url: '/apartmentPlaceholder.png' }]
                    }
                  />
                </ImageContainer>
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12} padding={1}>
                    <DryDetails apartmentInfo={apartmentInfo} />
                    <Box mt={1}>
                      <ApartmentFeatures apartmentInfo={apartmentInfo}></ApartmentFeatures>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <ApartmentDescription apartmentInfo={apartmentInfo}></ApartmentDescription>
            </Grid>
          </Grid>

          {isMyApartment ? (
            <LikesSection
              likes={apartmentLikes}
              handleApproveClick={handleApproveClick}
              handleDeclineClick={handleDeclineClick}
            ></LikesSection>
          ) : (
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={12} padding={1}>
                  <LandlordSection landlord={apartmentInfo.user}></LandlordSection>
                </Grid>
                <Grid item xs={12} padding={1}>
                  <PaymentCalculator apartmentInfo={apartmentInfo}></PaymentCalculator>
                </Grid>
              </Grid>
              <Grid item xs={12} padding={1} position={'relative'}>
                <Typography
                  sx={{
                    ...MatchLabelStyles,
                    top: 15,
                    right: 10,
                    border: '1px solid #CECECE',
                    borderRadius: 0,
                    zIndex: 1,
                    transform: 'rotate(323deg)',
                    color: matchColor,
                  }}
                >{`${apartmentInfo.match}% ${apartmentInfo.match === 100 ? 'Perfect' : ''} Match${
                  apartmentInfo.match === 100 ? '!' : ''
                }`}</Typography>
                <LoadingButton
                  color={isFavorite ? 'secondary' : isMatched ? 'error' : 'primary'}
                  onClick={() => handleLikeClick(apartmentInfo._id, String(apartmentInfo.user._id))}
                  fullWidth
                  loading={isLikeActionLoading}
                  variant={isFavorite ? 'outlined' : 'contained'}
                  size='large'
                  sx={{ fontWeight: 'bold', fontSize: '16px' }}
                  endIcon={isFavorite ? <ThumbUpOutlinedIcon /> : <FavoriteBorder />}
                >
                  {isFavorite ? 'Liked' : isMatched ? 'Matched!' : 'Like'}
                </LoadingButton>
              </Grid>
            </Grid>
          )}
        </Grid>
        <AddProperty
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          handleSave={handleSave}
          houseData={apartmentInfo}
          isEdit={true}
        />
      </Container>
    </>
  );
};

export default ApartmentDetails;