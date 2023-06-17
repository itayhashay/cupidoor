import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../Sidebar';
import { Outlet, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import CupidChat from '../Chat';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    if (location.pathname.includes('/home')) {
      setShowSideBar(true);
    } else {
      setShowSideBar(false);
    }
  }, [location]);
  return (
    <>
      <CssBaseline />
      <Navbar />

      <main>
        <Box height={'calc(100vh - 64px)'} overflow={'hidden'} display={'flex'}>
          {showSideBar && <Sidebar></Sidebar>}
          <Box overflow={'auto'}>
            <Outlet />
          </Box>
        </Box>
      </main>
      {user && <CupidChat></CupidChat>}
    </>
  );
};

export default MainLayout;
