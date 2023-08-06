import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { List, Box, Divider, Tooltip, Typography, IconButton } from '@mui/material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TuneIcon from '@mui/icons-material/Tune';
import { ROUTES_DEFAULT_STATE, USER_ROUTES } from '../UserRouter/constants';
import { DEFAULT_FILTERS } from '../Filters/constants';
import { Filter } from '../../types/filters';
import RangeSlider from '../Filters/RangeSlider';
import CheckBoxFilters from '../Filters/CheckBoxFilters';
import { Drawer, DrawerHeader } from './styles';
import {
  BasicFilters,
  PropertyFeaturesFilters,
  UserMenuItems,
  filtersToUrl,
  queryToFilters,
} from '../../utils/filters';
import AuthContext from '../../context/AuthContext';

export type FiltersStateType = {
  [key: string]: FilterStateValue;
};

export type FilterStateValue = number[] | boolean | null;

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filters, setFilters] = useState<FiltersStateType>(DEFAULT_FILTERS);
  const [filterCount, setFilterCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [navStates, setNavStates] = useState<{ [x: string]: boolean }>(ROUTES_DEFAULT_STATE);

  useEffect(() => {
    const currentUrl: string | undefined = Object.keys(navStates).find((url) =>
      location.pathname.includes(url),
    );
    currentUrl &&
      setNavStates({
        ...ROUTES_DEFAULT_STATE,
        [currentUrl]: true,
      });
  }, [location]);

  useEffect(() => {
    const queryString = window.location.search;
    if (!queryString) {
      setFilters(DEFAULT_FILTERS);
      return;
    }
    const enabledFilters: FiltersStateType = queryToFilters(queryString);
    setFilters({ ...enabledFilters });
  }, [location]);

  useEffect(() => {
    let count = 0;
    for (let filter of Object.values(filters)) {
      if (filter !== null) {
        count++;
      }
    }
    setFilterCount(count);
  }, [filters]);

  const commitFilter = (filterName: string, newValue: number[] | boolean) => {
    setFilters({
      ...filters,
      [filterName]: newValue,
    });
  };

  const applyFilters = () => {
    const url = filtersToUrl(filters);
    navigate(url);
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ToogleDrawer = () => {
    setOpen(!open);
  };

  const renderLifeStyleFilters = (filters: Filter[]) => {
    return (
      <>
        {filters.map((item, index) => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={item.id}
            flexDirection='row'
            alignItems='center'
            display='flex'
            justifyContent='space-between'
          >
            <Typography variant='body1'>{item.displayName}</Typography>
            <RangeSlider {...item.props} commitFilter={commitFilter} />
          </Grid>
        ))}
      </>
    );
  };

  const getFilterValue = (item: Filter): number[] | boolean | undefined => {
    const value = filters[item.props.filterName];
    return value !== null ? value : undefined;
  };

  const renderBasicFilters = (basicFilters: Filter[]) => {
    return (
      <>
        {basicFilters.map((item: Filter, index: number) => (
          <Box
            key={item.id}
            sx={{
              padding: '3px 10px',
              margin: '0',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <RangeSlider
              {...item.props}
              icon={item.icon}
              filterValue={getFilterValue(item) as number[]}
              commitFilter={commitFilter}
            />
          </Box>
        ))}
      </>
    );
  };

  return (
    <>
      <Drawer
        variant='permanent'
        anchor='left'
        open={open}
        sx={{ overflow: 'auto', position: 'relative', maxHeight: 'calc(100vh - 64px)' }}
      >
        <DrawerHeader
          sx={{
            bgcolor: 'primary.light',
            color: 'white',
            direction: 'rtl',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 'auto',
          }}
        >
          <IconButton onClick={ToogleDrawer} sx={{ color: 'white' }}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Typography
            variant='h5'
            sx={{
              visibility: open ? 'visible' : 'hidden',
              fontWeight: '500',
            }}
          >
            Menu
          </Typography>
        </DrawerHeader>
        <Box>
          <List>
            {UserMenuItems.map(
              (item) =>
                user &&
                item.roles.includes(user?.role) && (
                  <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                    <Link className='sidebar-link' to={`home/${item.urlName}`}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: 'space-between',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            height: '30px',
                            width: '30px',
                          }}
                        >
                          {navStates[item.urlName] ? item.selectedIcon : item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.displayName}
                          sx={{ opacity: open ? 1 : 0, color: '#4d4d4d' }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ),
            )}
          </List>
          {navStates[USER_ROUTES.ALL_APARTMENTS] && (
            <Box>
              <Divider />
              <DrawerHeader
                sx={{
                  direction: 'rtl',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 'auto',
                }}
              >
                <IconButton
                  onClick={ToogleDrawer}
                  disabled={open}
                  sx={{ display: open ? 'none' : 'block' }}
                >
                  <TuneIcon />
                </IconButton>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    visibility: open ? 'visible' : 'hidden',
                  }}
                >
                  <Tooltip title='Reset Filters'>
                    <Link className='navbar-link' to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}>
                      <IconButton color='primary' size='small'>
                        <CloseOutlined></CloseOutlined>
                      </IconButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title='Apply Filters'>
                    <span>
                      <IconButton onClick={applyFilters} color='primary'>
                        <CheckOutlined></CheckOutlined>
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
                <Typography
                  variant='h5'
                  sx={{
                    visibility: open ? 'visible' : 'hidden',
                    fontWeight: '500',
                  }}
                >
                  Filters
                </Typography>
              </DrawerHeader>
              <List
                sx={{
                  display: open ? 'block' : 'none',
                  borderTop: '1px solid lightgrey',
                  paddingTop: '8px',
                  marginTop: '8px',
                }}
              >
                {renderBasicFilters(BasicFilters)}
              </List>
              <Box sx={{ display: open ? 'block' : 'none' }}>
                <CheckBoxFilters
                  filters={PropertyFeaturesFilters}
                  values={filters}
                  commitFilter={commitFilter}
                ></CheckBoxFilters>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
