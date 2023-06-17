import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Apartment } from '../../types/apartment';
import DryDetails from './DryDetails';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { ImageContainer } from './styles';
import ImagesGallery from './ImagesGallery';
import { FavoriteBorder, PercentRounded } from '@mui/icons-material';
import ApartmentProperties from './ApartmentProperties';
import { green } from '@mui/material/colors';
import { precentToColor } from '../../utils/colors';
import { MatchLabelStyles } from '../HouseCard/styles';
import useAPI from '../../hooks/useAPI';

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

  if (!apartmentInfo) return null;
  return (
    // TODO: Change last updated mock.
    <Container maxWidth='xl' sx={{ paddingY: 10 }}>
      <Grid container component={Paper} elevation={3} position='relative'>
        <Grid item xs={12}>
          <ImageContainer className='apartment-gallery'>
            <ImagesGallery images={apartmentInfo.images}/>
          </ImageContainer>
        </Grid>
        <Grid item xs={12} padding={5}>
          <Grid container>
            <Grid item md={7} xs={12} padding={1}>
              <DryDetails apartmentInfo={apartmentInfo} />
              <Box mt={1}>
                <ApartmentProperties apartmentInfo={apartmentInfo}></ApartmentProperties>
              </Box>
              <Box display={'flex'} alignItems={'center'} mb={2} mt={1}>
                <LocationOnIcon></LocationOnIcon>
                <Typography variant='body1' fontWeight={'bold'} ml={1} fontSize={20}>
                  {apartmentInfo.city},{apartmentInfo.street} {apartmentInfo.houseNumber}
                </Typography>
                <Box
                  ml={3}
                  width={56}
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
              <Box display={'flex'} px={2}>
                <Typography>
                  <b>Description:</b> {apartmentInfo.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={5} xs={12}>
              <Box padding={1} height={'100%'} display={'flex'} flexDirection={'column'}>
                <Typography variant='h6'>Contact Info</Typography>
                <Box padding={2}>
                  <Box display={'flex'} alignItems={'center'} mb={1}>
                    <Avatar src={apartmentInfo.user.avatar} sx={{ width: 56, height: 56 }}></Avatar>
                    <Box ml={2}>
                      <Typography
                        variant='subtitle2'
                        fontWeight={'bold'}
                        lineHeight={1}
                        fontSize={18}
                      >
                        {`${apartmentInfo.user.firstName} ${apartmentInfo.user.lastName}`}
                      </Typography>
                      <Typography variant='caption'>Owner</Typography>
                    </Box>
                  </Box>
                  <Box padding={1}>
                    <Typography variant='body2' fontSize={'16px'}>
                      {apartmentInfo.user.description}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={'auto'} pb={3}>
                  <Box pb={2} display={'flex'} justifyContent={'space-between'}>
                    <div>
                      <Typography variant='body1' fontWeight={'bolder'} fontSize={16}>
                        Monthly rental:
                      </Typography>
                      <Box display={'flex'} alignItems={'end'} padding={1}>
                        <Typography fontWeight={'bold'} fontSize={18}>
                          ₪{apartmentInfo.totalPrice}
                        </Typography>
                        <Typography color={'GrayText'} fontSize={14}>
                          /month
                        </Typography>
                      </Box>
                    </div>
                    <div>
                      <Typography variant='body1' fontWeight={'bolder'} fontSize={16}>
                        Entrance date:
                      </Typography>
                      <Box display={'flex'} alignItems={'end'}>
                        <Typography fontWeight={'bold'} fontSize={18} padding={1}>
                          {new Date(apartmentInfo.entranceDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </div>
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartmentDetails;
