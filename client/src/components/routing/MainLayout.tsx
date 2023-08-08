import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../Sidebar';
import { Outlet, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import CupidChat from '../Chat';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';
import ProtectedRoute from './ProtectedRoute';
import PreFetch from './PreFetch';
const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  useEffect(() => {
    if (location.pathname.includes('/home')) {
      setShowSideBar(true);
    } else {
      setShowSideBar(false);
    }
    if(location.pathname.includes("/admin")){
      setShowNavbar(false);
    }else{
      setShowNavbar(true);
    }
  }, [location]);
  return (
    <ProtectedRoute>
      <PreFetch>
        <>
          <CssBaseline />
          {showNavbar && <Navbar />}

          <main>
            <Box height={showNavbar ? 'calc(100vh - 64px)' : "100vh"} overflow={'hidden'} display={'flex'} bgcolor={"#e8e8e8"}>
              {showSideBar && <Sidebar></Sidebar>}
              <Box overflow={'auto'}>
                <Outlet />
              </Box>
            </Box>
          </main>
          {user && showNavbar && <CupidChat></CupidChat>}
        </>
      </PreFetch>
    </ProtectedRoute>
  );
};

export default MainLayout;
