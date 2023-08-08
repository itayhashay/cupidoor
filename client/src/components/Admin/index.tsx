import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
import BackButton from '../BackButton';
import DescriptionIcon from '@mui/icons-material/Description';
import AdminSwagger from './AdminSwagger';

const drawerWidth = 240;

const AdminRouter = () => {
  const { user } = useAuth();
  const [selectedPage, setSelectedPage] = useState(<AdminAnalytics></AdminAnalytics>);
  const {hash} = useLocation();
  const navigate= useNavigate();
  const sections = useMemo(
    () => [
      { title: 'Dashboard', icon: <AnalyticsIcon />,href:"dashboard" },
      { title: 'Users', icon: <PersonIcon /> ,href:"users"},
      { title: 'Properties', icon: <HouseIcon /> ,href:"properties"},
      { title: 'Swagger', icon: <DescriptionIcon /> ,href:"swagger"},
    ],
    [false],
  );

  useEffect(() => {
    console.log(hash);
    switch (hash) {
      case "#dashboard":
        setSelectedPage(<AdminAnalytics />);
        break;
      case "#users":
        setSelectedPage(<AdminUsers />);
        break;
      case "#properties":
        setSelectedPage(<AdminProperties />);
        break;
      case "#swagger":
        setSelectedPage(<AdminSwagger />);
        break;
    }
  }, [hash]);

  const handleSectionClick = (index: number) => {

navigate(`#${sections[index].href}`);
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
          <img src={LogoWhite} alt='logo' style={{ height: '4rem', marginRight: '2px' }} />
          <Typography variant='h6' ml={1} color={'white'}>
            Cupidoor
          </Typography>
        </Box>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <BackButton bgcolor={'secondary.light'}></BackButton>
        </Box>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ color: 'white' }}>
            {sections.map((section, index) => (
              <ListItem key={section.title}>
                <ListItemButton
                  selected={hash === `#${section.href}`}
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
  );
};

export default AdminRouter;
