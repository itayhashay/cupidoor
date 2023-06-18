import { Route, Routes } from 'react-router-dom';
import { USER_ROUTES } from '../UserRouter/constants';
import MyProperties from '../UserRouter/MyProperties';
import { Box } from '@mui/material';
import LikedApartments from '../UserRouter/LikedApartments';
import AllApartments from '../UserRouter/AllApartments';
const HomeRouter = () => {
  return (
    <>
      <Box display={'flex'}>
        <Box>
          <Routes>
            <Route
              path={`/${USER_ROUTES.ALL_APARTMENTS}`}
              element={<AllApartments></AllApartments>}
            ></Route>
            <Route path={`/${USER_ROUTES.LIKED_APARTMENTS}`} element={<LikedApartments />}></Route>
            <Route path={`/${USER_ROUTES.MY_PROPERTIES}`} element={<MyProperties />}></Route>
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default HomeRouter;
