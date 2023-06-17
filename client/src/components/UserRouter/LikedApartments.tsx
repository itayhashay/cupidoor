import { Box, Button, Fab, Typography } from '@mui/material';
import GenericHousesList from '../GenericHousesList';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import AddProperty from '../AddProperty';
import { useEffect, useState } from 'react';
import { getUserId } from '../../utils/localStorage';
import { Apartment } from '../../types/apartment';
import useAPI from '../../hooks/useAPI';
import CupidoorSpinner from '../CupidoorSpinner';

const LikedApartments = () => {
  const [likedApartments, setLikedApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getUserLikedApartments } = useAPI();

  useEffect(() => {
    const fetchLikedApartments = async () => {
      setIsLoading(true);
      const likes: any[] = await getUserLikedApartments();

      setLikedApartments(likes);
      setIsLoading(false);
    };

    fetchLikedApartments();
  }, []);

  return isLoading ? (
    <CupidoorSpinner></CupidoorSpinner>
  ) : (
    <Box sx={{ overflowY: 'auto', position: 'relative' }}>
      <>
        {likedApartments.length > 0 ? (
          <GenericHousesList apartments={likedApartments} />
        ) : (
          <Box
            height='85%'
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            padding='0 45px'
          >
            <Box
              display='flex'
              flexDirection='column'
              alignItems='flex-start'
              justifyContent='space-evenly'
              height='60vh'
            >
              <Typography variant='h2' fontWeight='700'>
                All Your favorite apartment In One Place!
              </Typography>
              <Typography variant='h6' fontWeight='300'>
                By marking an apartment as Liked you inform the landlord that you are interested in
                the apartment.
                <br />
                Who knows, maybe he will be interested in you too...
              </Typography>
            </Box>
            <Box display='flex' alignItems='center' justifyContent='center' height='100%'>
              <img alt='' src='/loved-house.jpg' style={{ height: '60vh', width: '80vh' }} />
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};

export default LikedApartments;
