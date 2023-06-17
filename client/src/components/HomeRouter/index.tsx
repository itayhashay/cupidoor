import { Apartment } from '../../types/apartment';
import Sidebar from '../Sidebar';
import { Route, Routes } from 'react-router-dom';
import { USER_ROUTES } from '../UserRouter/constants';
import MyProperties from '../UserRouter/MyProperties';
import GenericHousesList from '../GenericHousesList';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import LikedApartments from '../UserRouter/LikedApartments';
import CupidoorSpinner from '../CupidoorSpinner';
const HomeRouter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apartments, setApartments] = useState<Apartment[]>([] as Apartment[]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchApartments = async () => {
      const response = await axiosPrivate.get('/apartment');
      setApartments(response.data);
      setIsLoading(false);
    };

    fetchApartments();
  }, []);
  return (
    <>
      {isLoading ? (
        <CupidoorSpinner></CupidoorSpinner>
      ) : (
        <Box display={'flex'}>
          <Sidebar />
          <Box>
            <Routes>
              <Route
                path={`/${USER_ROUTES.ALL_APARTMENTS}`}
                element={<GenericHousesList apartments={apartments} />}
              ></Route>
              <Route
                path={`/${USER_ROUTES.LIKED_APARTMENTS}`}
                element={<LikedApartments />}
              ></Route>
              <Route path={`/${USER_ROUTES.MY_PROPERTIES}`} element={<MyProperties />}></Route>
            </Routes>
          </Box>
        </Box>
      )}
    </>
  );
};

export default HomeRouter;
