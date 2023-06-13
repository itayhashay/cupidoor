import { useEffect, useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from '@mui/icons-material/Tune';
import { Drawer, DrawerHeader } from "./styles";
import { BasicFilters, LifeStyleFilters, UserMenuItems, filtersToUrl, queryToFilters } from "../../utils/filters";
import { Box, Button, Divider, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DEFAULT_FILTERS } from "../Filters/constants";
import { Filter } from "../../types/filters";
import RangeSlider from "../Filters/RangeSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES_DEFAULT_STATE, USER_ROUTES, USER_ROUTES_DEFAULT_STATE } from "../UserRouter/constants";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filters, setFilters] = useState<{[x: string]: number[] | null}>(DEFAULT_FILTERS);
  const navigate = useNavigate();
  const location = useLocation()
  const [navStates, setNavStates] = useState<{[x: string]: boolean;}>(ROUTES_DEFAULT_STATE);

  useEffect(() => {
      const currentUrl: string| undefined = Object.keys(navStates).find(url => location.pathname.includes(url));
      currentUrl && setNavStates({
          ...ROUTES_DEFAULT_STATE,
          [currentUrl]: true
      })
  }, [location])

  useEffect(() => {
    const queryString = window.location.search;
    if(!queryString) {
      setFilters(DEFAULT_FILTERS);
      return;
    }
    const enabledFilters: {[x: string]: number[] | null} = queryToFilters(queryString);
    setFilters({ ...enabledFilters});
  }, [location])

  const commitFilter = (filterName: string, newValue: number[]) => {
    setFilters({
      ...filters,
      [filterName]: newValue,
    });
  }

  const applyFilters = () => {
    const url = filtersToUrl(filters);
    navigate(url);
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const ToogleDrawer = () => {
    setOpen(!open);
  };

  const renderLifeStyleFilters = (filters: Filter[]) => {
    return <>
            {filters.map((item, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} flexDirection="row" alignItems="center" display="flex" justifyContent="space-between">
                <Typography variant="body1">{item.displayName}</Typography>
                <RangeSlider {...item.props} commitFilter={commitFilter}/>
              </Grid>
            ))}
    </>
  }

  const getFilterValue = (item: Filter): number[] | undefined => {
    const value = filters[item.props.filterName];
    return value !== null ? value : undefined;
  }

  const renderBasicFilters = (basicFilters: Filter[]) => {
    return <>
            {basicFilters.map((item: Filter, index: number) => (
              <Box sx={{ padding: "3px 10px", margin: '0', width: '100%', display: "flex", flexDirection:"row"}} >
                <RangeSlider {...item.props} icon={item.icon} filterValue={getFilterValue(item)} commitFilter={commitFilter}/>
              </Box>
            ))}
    </>
  }

  // TODO: How to display life style filters?
  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{maxHeight: '91vh', overflow: 'auto', position: 'relative'}}>
        <DrawerHeader sx={{direction: "rtl",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "auto"}}>
          <IconButton onClick={ToogleDrawer}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Typography variant="h5" sx={{ marginLeft: "5px", visibility: open ? "visible" : "hidden", fontWeight: "500"}}>
            Menu
          </Typography>
        </DrawerHeader>
        <List>
          {UserMenuItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <Link className="sidebar-link" to={`${item.urlName}`}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "space-between",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      height: "30px", width: "30px"
                    }}
                  >
                    {navStates[item.urlName] ? item.selectedIcon : item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.displayName}
                    sx={{ opacity: open ? 1 : 0, color: "#4d4d4d" }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        {
          navStates[USER_ROUTES.ALL_APARTMENTS] && (
            <Box>
              <Divider />
              <DrawerHeader sx={{direction: "rtl",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          height: "auto"}}>
                    <IconButton onClick={ToogleDrawer} disabled={open}>
                      <TuneIcon />
                    </IconButton>
                    <Typography variant="h5" sx={{ marginLeft: "5px", visibility: open ? "visible" : "hidden", fontWeight: "500"}}>
                      Filters
                    </Typography>
              </DrawerHeader>
              <List sx={{ display: open ? "block" : "none", borderTop: '1px solid lightgrey', paddingTop: "8px", marginTop: '8px' }}>
                {renderBasicFilters(BasicFilters)}
              </List>
              <Box sx={{ display: "flex", flexDirection: "column" , alignItems:"center", justifyContent: "center", visibility: open ? "visible" : "hidden"}}>
                <Link className="navbar-link" to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}>
                  <Button
                    color="primary"
                    size="small"
                    variant="text"
                  >
                    Reset Filters
                  </Button>
                </Link>
                <Button onClick={applyFilters} variant="contained" color="primary" sx={{ width: '80%' }}>
                  Apply Filters
                </Button>
              </Box>
            </Box>
          )
        }
      </Drawer>
    </>
  );
};

export default Sidebar;