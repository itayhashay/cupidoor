import { Routes, Route } from 'react-router-dom';
// import AdminUsers from "./Admin.Users";
// import MyProperties from './MyProperties';
// import LikedApartments from "./LikedApartments"
import GenericHousesList from '../GenericHousesList';
import { ROUTES } from './routes';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/user';
import { Apartment } from '../../types/apartment';
import { Navigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Grid,
  Paper,
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import LogoWhite from '../../icons/logo-main.svg';
import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AdminAnalytics from './AdminAnalytics';
import AdminUsers from './AdminUsers';
import AdminProperties from './AdminProperties';

const drawerWidth = 240;

const AdminRouter = () => {
  const { user } = useAuth();
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number>(0);
  const [selectedPage, setSelectedPage] = useState(<AdminAnalytics></AdminAnalytics>);
  const sections = useMemo(
    () => [
      { title: 'Dashboard', icon: <AnalyticsIcon /> },
      { title: 'Users', icon: <PersonIcon /> },
      { title: 'Properties', icon: <HouseIcon /> },
    ],
    [false],
  );

  useEffect(() => {
    switch (selectedSectionIndex) {
      case 0:
        setSelectedPage(<AdminAnalytics />);
        break;
      case 1:
        setSelectedPage(<AdminUsers />);
        break;
      case 2:
        setSelectedPage(<AdminProperties />);
        break;
    }
  }, [selectedSectionIndex]);

  const handleSectionClick = (index: number) => {
    setSelectedSectionIndex((oldIndex) => {
      if (oldIndex !== index) {
        return index;
      }
      return index;
    });
  };

  if (!user?.isAdmin) {
    return <Navigate to={'/403'} />;
  }

  return (
    <Box display={'flex'} height={'100%'}>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          height: '100%',
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'primary.main',
          },
        }}
      >
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} pt={2}>
          <img
            src={LogoWhite}
            alt='logo'
            style={{ height: '4rem', marginRight: '2px', cursor: 'pointer' }}
          />
          <Typography variant='h6' ml={1} color={'white'}>
            Cupidoor
          </Typography>
        </Box>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ color: 'white' }}>
            {sections.map((section, index) => (
              <ListItem key={section.title}>
                <ListItemButton
                  selected={selectedSectionIndex === index}
                  onClick={() => handleSectionClick(index)}
                  sx={{
                    color: 'white',
                    borderRadius: 3,
                    '&.MuiListItemButton-root:hover': {
                      bgcolor: 'secondary.dark',
                    },
                    '&.Mui-selected, &.Mui-selected:hover': {
                      bgcolor: 'primary.light',
                      borderRadius: 3,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      '&.MuiListItemIcon-root': {
                        color: 'white',
                      },
                    }}
                  >
                    {section.icon}
                  </ListItemIcon>
                  <ListItemText primary={section.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box 
        width={`calc(100% - ${drawerWidth}px)`}
        height={'100%'}
        py={3}
        px={5}
        bgcolor={'#dfdede'}
        overflow={'auto'}
      >
          {selectedPage}
      </Box>
    </Box>

    // <Routes>
    //         <Route path={`/${ROUTES.USERS}`} element={<AdminUsers/>}></Route>
    //         <Route path={`/${ROUTES.APARTMENTS}`} element={<GenericHousesList apartments={{} as Apartment[]}/>}></Route>
    //         <Route path={`/${ROUTES.ANALYTICS}`} element={<MyProperties />}></Route>
    //     </Routes>
  );
};

export default AdminRouter;
