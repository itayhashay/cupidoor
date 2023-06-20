import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Apartment } from '../../types/apartment';
import DryDetails from './DryDetails';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ImageContainer } from './styles';
import ImagesGallery from './ImagesGallery';
import { FavoriteBorder } from '@mui/icons-material';
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

const ApartmentDetails = () => {
  const [apartmentInfo, setApartmentInfo] = useState<Apartment | null>(null);
  const [matchColor, setMatchColor] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [isMyApartment, setIsMyApartment] = useState<boolean>(false);
  const [apartmentLikes, setApartmentLikes] = useState<User[]>([] as User[]);
  const [isLikesLoading, setIsLikesLoading] = useState<boolean>(false);
  const { setSnackBarState } = useSnackbar();
  const {
    getApartmentById,
    toggleTenantLike,
    getApartmentLikes,
    approveTenant,
    declineTenant
  } = useAPI();
  const { user } = useAuth();
  const params = useParams();
  const { showConfirmationModal } = useConfirmationModal();

  useEffect(() => {
    const fetchApartmentLikes = async (id: string) => {
      const likes: User[] = await getApartmentLikes(id);
      setApartmentLikes(likes);
      setIsLikesLoading(false);
    };

    const fetchApartmentData = async (id: string) => {
      const apartment: Apartment = await getApartmentById(id);
      setApartmentInfo(apartment);
      if (apartment.user._id === user?._id) {
        setIsLikesLoading(true);
        setIsMyApartment(true);
        fetchApartmentLikes(id);
      }
      setIsFavorite(apartment?.liked as boolean);
      setIsMatched(apartment?.matched as boolean);
    };

    const apartmentId: string = params.id || '';

    if (apartmentId) {
      fetchApartmentData(apartmentId);
    }
  }, [params.id]);

  useEffect(() => {
    const color: string = precentToColor(apartmentInfo?.match || 0);
    setMatchColor(color);
  }, [apartmentInfo]);

  const handleLikeClick = async (apartmentId: string, userId: string) => {
    let flag = true;
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
  const handleDeclineClick = (tenantId:string) => {
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

  if (!apartmentInfo) return <CupidoorSpinner></CupidoorSpinner>;
  return (
    // TODO: Change last updated mock.
    <Container maxWidth='xl' sx={{ paddingY: 10 }}>
      <Grid container component={Paper} elevation={3}>
        <Grid item xs={12} height={60} padding={2} width={'100%'} bgcolor={'primary.dark'}>
          <Box display={'flex'} color={'white'} alignItems={'center'} height={'100%'}>
            <LocationOnIcon></LocationOnIcon>
            <Typography variant='h5' fontWeight={'bold'} ml={1}>
              {`${apartmentInfo.city}, ${apartmentInfo.street} ${apartmentInfo.houseNumber}`}
            </Typography>
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
              <Button
                color={isFavorite ? 'secondary' : isMatched ? 'error' : 'primary'}
                onClick={() => handleLikeClick(apartmentInfo._id, String(apartmentInfo.user._id))}
                fullWidth
                variant={isFavorite ? 'outlined' : 'contained'}
                size='large'
                endIcon={<FavoriteBorder></FavoriteBorder>}
              >
                {isFavorite ? 'Liked' : isMatched ? 'Matched!' : 'Like'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default ApartmentDetails;
