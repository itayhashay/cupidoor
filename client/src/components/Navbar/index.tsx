import { AppBar, Box, Toolbar, Button, Grid, Menu } from '@mui/material';
import { Avatar, Typography, MenuItem } from '@mui/material';
import { linkStyles } from './styles';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { USER_ROUTES } from '../UserRouter/constants';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../../icons/logo.svg';
import LogoWhite from '../../icons/logo-main.svg';

import UseAuthApi from '../../hooks/useAuthAPI';

export const Navbar = () => {
  const { user, setUser } = useAuth();
  const { signOut } = UseAuthApi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarBGcolor, setNavbarBGcolor] = useState<string>('#e7e6f0');
  const [navbarColor, setNavbarColor] = useState<string>('#434336');

  useEffect(() => {
    if (location.pathname === '/') {
      setNavbarBGcolor('#e7e6f0');
      setNavbarColor('#434336');
    } else {
      setNavbarBGcolor('#e7e6f0');
      setNavbarColor('#fff');
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setNavbarBGcolor('#e7e6f0');
      setNavbarColor('#434336');
    } else {
      setNavbarBGcolor('#e7e6f0');
      setNavbarColor('#434336');
    }
  }, [location.pathname]);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleAccountNavigation = () => {
    if (location.pathname !== '/user/personal-info') navigate('/user/personal-info');
    handleMenuClose();
  };
  const   handleDashboardNavigation = () => {
    if (location.pathname !== '/admin') navigate('/admin');
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box flexGrow={1} position={'sticky'}>
      <AppBar position='static' sx={{ bgcolor: 'primary.main' }} elevation={10}>
        <Toolbar>
          <Grid container justifyContent={'space-between'}>
            <Grid item xs={1} display={'flex'} alignItems={'center'}>
              <Link to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}>
                <img
                  src={location.pathname === '/' ? Logo : LogoWhite}
                  alt='logo'
                  style={{ height: '4rem', marginRight: '2px', cursor: 'pointer' }}
                />
              </Link>
              <Typography variant='h6' ml={1}>
                Cupidoor
              </Typography>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={2} display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
              {user ? (
                <>
                  <Typography
                    variant='h6'
                    sx={{ marginRight: '16px' }}
                  >{`Hello ${user.firstName}`}</Typography>
                  <Link to={'/user/personal-info'}></Link>
                  <Avatar
                    id='avatar-menu-button'
                    alt={user.firstName}
                    src={user?.avatar}
                    sx={{ cursor: 'pointer' }}
                    onClick={handleMenuClick}
                  />
                  <Menu
                    id='avatar-menu'
                    aria-labelledby='avatar-menu-button'
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <MenuItem onClick={handleAccountNavigation} sx={{ mb: 1 }}>
                      <AccountCircleIcon sx={{ mr: 1 }}></AccountCircleIcon> Account
                    </MenuItem>
                    {user.isAdmin && (
                      <MenuItem onClick={handleDashboardNavigation} sx={{ mb: 1 }}>
                        <DashboardIcon sx={{ mr: 1 }}></DashboardIcon> Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleSignOut}>
                      <LogoutIcon sx={{ mr: 1 }}></LogoutIcon>
                      Sign Out
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button sx={linkStyles}>
                    <Typography component={Link} to={'/signIn'} sx={{ color: 'white' }}>
                      Sign In
                    </Typography>
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>

    // <Box flexGrow={1}>
    //   <AppBar
    //   elevation={10}
    //     sx={{
    //       position: 'static',
    //       bgcolor: 'white',
    //       color:"black"
    //     }}
    //   >
    //     <Toolbar disableGutters>
    //       <Link to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}>
    //         <CupidoorLogo sx={{ fontSize: 64 }} color='error'></CupidoorLogo>
    //       </Link>
    //       <Typography variant='h6'>Cupidoor</Typography>
    //       <Box display={'flex'} flexGrow={1}>
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             justifyContent: 'end',
    //           }}
    //         >
    //           <UserSection>
    //             {user ? (
    //               <>
    //                 <Typography
    //                   variant='h6'
    //                   sx={{ marginRight: '16px' }}
    //                 >{`Hello ${user.firstName}`}</Typography>
    //                 <Link to={'/user/personal-info'}></Link>
    //                 <Avatar
    //                   id='avatar-menu-button'
    //                   alt={user.firstName}
    //                   src={user?.avatar}
    //                   sx={{ cursor: 'pointer' }}
    //                   onClick={handleMenuClick}
    //                 />
    //                 <Menu
    //                   id='avatar-menu'
    //                   aria-labelledby='avatar-menu-button'
    //                   anchorEl={anchorEl}
    //                   open={isMenuOpen}
    //                   onClose={handleMenuClose}
    //                   anchorOrigin={{
    //                     vertical: 'bottom',
    //                     horizontal: 'left',
    //                   }}
    //                   transformOrigin={{
    //                     vertical: 'top',
    //                     horizontal: 'left',
    //                   }}
    //                 >
    //                   <MenuItem onClick={handleAccountNavigation} sx={{ mb: 1 }}>
    //                     <AccountCircleIcon sx={{ mr: 1 }}></AccountCircleIcon> Account
    //                   </MenuItem>
    //                   <MenuItem onClick={handleSignOut}>
    //                     <LogoutIcon sx={{ mr: 1 }}></LogoutIcon>
    //                     Sign Out
    //                   </MenuItem>
    //                 </Menu>
    //               </>
    //             ) : (
    //               <>
    //                 <Button sx={linkStyles}>
    //                   <Typography component={Link} to={'/signIn'} sx={{ color: 'white' }}>
    //                     Sign In
    //                   </Typography>
    //                 </Button>
    //               </>
    //             )}
    //           </UserSection>
    //         </Box>
    //       </Box>
    //     </Toolbar>
    //   </AppBar>
    // </Box>

    // <Box
    //   sx={{ flexGrow: 1, position: 'sticky', top: '0', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    // >

    // </Box>
  );
};

export default Navbar;
