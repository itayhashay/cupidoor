import { useEffect, useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TuneIcon from '@mui/icons-material/Tune';
import { Drawer, DrawerHeader } from "./styles";
import { BasicFilters, LifeStyleFilters, filtersToUrl, queryToFilters } from "../../utils/filters";
import { Box, Button, Grid, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DEFAULT_FILTERS } from "../Filters/constants";
import { Filter } from "../../types/filters";
import RangeSlider from "../Filters/RangeSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filters, setFilters] = useState<{[x: string]: number[] | null}>(DEFAULT_FILTERS);
  const navigate = useNavigate();
  const location = useLocation()

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
            {basicFilters.map((item: Filter) => (
              <Accordion key={item.id} expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)} sx={{ margin: "0px !important" }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography variant="body1" sx={{ width: '33%', flexShrink: 0 }}>
                    {item.displayName}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{padding: '0'}}>
                <Box sx={{ padding: "0 5px", margin: 'auto', width: '85%'}} >
                      <RangeSlider {...item.props} filterValue={getFilterValue(item)} commitFilter={commitFilter}/>
                      </Box>
                  </AccordionDetails>
                </Accordion>
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
            {!open ? <TuneIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Typography variant="h5" sx={{ marginLeft: "5px", visibility: open ? "visible" : "hidden", fontWeight: "500"}}>
            Filters
          </Typography>
        </DrawerHeader>
        <List sx={{ display: open ? "block" : "none", borderTop: '1px solid lightgrey', paddingTop: 0, marginTop: '8px' }}>
          {renderBasicFilters(BasicFilters)}
          {/* <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 2, sm: 3, md: 8 }} justifyContent="center" padding="0 16px" marginTop="5px">
            {renderLifeStyleFilters(LifeStyleFilters)}
          </Grid> */}
        </List>
        <Box sx={{ display: "flex", flexDirection: "column" , alignItems:"center", justifyContent: "center", position: "absolute", bottom: "20px", visibility: open ? "visible" : "hidden"}}>
        <Link className="navbar-link" to={`/home`}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >Reset Filters</Button>
          </Link>
          <Button onClick={applyFilters} variant="contained" color="primary" sx={{ width: '80%' }}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;