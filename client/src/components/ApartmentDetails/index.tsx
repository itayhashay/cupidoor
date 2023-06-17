import { Avatar, Box, Button, Container, Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Apartment } from '../../types/apartment';
import DryDetails from './DryDetails';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ImageContainer } from './styles';
import ImagesGallery from './ImagesGallery';
import { FavoriteBorder, PercentRounded } from '@mui/icons-material';
import ApartmentFeatures from './ApartmentFeatures';
import { precentToColor } from '../../utils/colors';
import useAPI from '../../hooks/useAPI';
import CupidoorSpinner from '../CupidoorSpinner';
import LandlordSection from './LandlordSection';

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
    const color: string = precentToColor(apartmentInfo?.match);
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
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    mb={2}
                    mt={1}
                    justifyContent={'space-between'}
                  >
                    <Box
                      mx={1}
                      width={66}
                      height={56}
                      alignItems={'center'}
                      justifyContent={'center'}
                      display={'flex'}
                      borderRadius={500}
                      bgcolor={matchColor}
                      component={Paper}
                      elevation={6}
                    >
                      <Typography
                        textAlign={'center'}
                        fontWeight={'bold'}
                        fontSize={18}
                        sx={{
                          color: 'white',
                        }}
                      >
                        {apartmentInfo.match}%
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} padding={1}>
                  <Typography variant='h6'>Details</Typography>
                  <Divider sx={{ my: 1 }}></Divider>
                  <Box mb={1}>
                    <Typography variant='subtitle1' fontWeight={'bold'} mr={1}>
                      Property Condition:
                    </Typography>
                    <Typography variant='body2'>{apartmentInfo.propertyCondition}</Typography>
                  </Box>
                  <Box>
                    <Typography variant='subtitle1' fontWeight={'bold'} mr={1}>
                      Description:
                    </Typography>
                    <Typography variant='body2'>{apartmentInfo.description}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <Box mb={2} padding={1} height={'100%'} display={'flex'} flexDirection={'column'}>
            <LandlordSection landlord={apartmentInfo.user}></LandlordSection>

            <Box mt={'auto'}>
              <Typography variant='h6'>Fees & Terms</Typography>
              <Divider></Divider>
              <Box padding={2} display={'flex'} justifyContent={'space-between'}>
                <Box>
                  <Typography variant='body2'>Monthly rental:</Typography>
                  <Box display={'flex'} alignItems={'end'} padding={1}>
                    <Typography fontWeight={'bold'}>₪{apartmentInfo.totalPrice}</Typography>
                    <Typography color={'GrayText'}>/month</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant='body1' fontWeight={'bolder'}>
                    Entrance date:
                  </Typography>
                  <Box display={'flex'} alignItems={'end'}>
                    <Typography fontWeight={'bold'} padding={1}>
                      {new Date(apartmentInfo.entranceDate).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                fullWidth
                variant='contained'
                size='large'
                endIcon={<FavoriteBorder></FavoriteBorder>}
              >
                Like
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartmentDetails;
