import { Avatar, Box, Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Apartment } from '../../types/apartment';
import DryDetails from './DryDetails';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ImageContainer } from './styles';
import ImagesGallery from './ImagesGallery';
import { ExpandLess, ExpandMore, FavoriteBorder, PercentRounded } from '@mui/icons-material';
import ApartmentFeatures from './ApartmentFeatures';
import { precentToColor } from '../../utils/colors';
import useAPI from '../../hooks/useAPI';
import CupidoorSpinner from '../CupidoorSpinner';
import LandlordSection from './LandlordSection';
import ApartmentDescription from './ApartmentDescription';
import PaymentCalculator from './PaymentCalculator';
import { MatchLabelStyles } from '../HouseCard/styles';

const ApartmentDetails = () => {
  const [apartmentInfo, setApartmentInfo] = useState<Apartment | null>(null);
  const [matchColor, setMatchColor] = useState<string>('');
  const { getApartmentById } = useAPI();
  const params = useParams();

  useEffect(() => {
    const fetchApartmentData = async (id: string) => {
      const apartment: Apartment = await getApartmentById(id);
      setApartmentInfo(apartment);
    };

    const apartmentId: string = params.id || '';

    if (apartmentId) fetchApartmentData(apartmentId);
    else console.log('error');
  }, [params.id]);

  useEffect(() => {
    const color: string = precentToColor(apartmentInfo?.match || 0);
    setMatchColor(color);
  }, [apartmentInfo]);

  if (!apartmentInfo) return <CupidoorSpinner></CupidoorSpinner>;
  return (
    // TODO: Change last updated mock.
    <Container maxWidth='xl' sx={{ paddingY: 10 }}>
      <Grid container component={Paper} elevation={3}>
        <Grid item xs={12} height={60} padding={2} width={'100%'} bgcolor={'primary.dark'}>
          <Box display={'flex'} color={'white'} alignItems={'center'} height={'100%'}>
            <LocationOnIcon></LocationOnIcon>
            <Typography variant='h5' fontWeight={'bold'} ml={1}>
              {apartmentInfo.city},{apartmentInfo.street} {apartmentInfo.houseNumber}
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

        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12} padding={1}>
              <LandlordSection landlord={apartmentInfo.user}></LandlordSection>
            </Grid>
            <Grid item xs={12} padding={1}>
              <PaymentCalculator apartmentInfo={apartmentInfo}></PaymentCalculator>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'center'}>
              <Avatar sx={{ bgcolor: matchColor, height: 60, width: 60 }}>
                <Typography>{apartmentInfo.match}%</Typography>
              </Avatar>
            </Box>
          </Grid> */}
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
              fullWidth
              variant='contained'
              size='large'
              endIcon={<FavoriteBorder></FavoriteBorder>}
            >
              Like
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartmentDetails;
