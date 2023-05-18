import { useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TuneIcon from '@mui/icons-material/Tune';
import { Drawer, DrawerHeader } from "./styles";
import { BasicFilters, Filter, LifeStyleFilters } from "../../utils/filters";
import { Box, Grid, Typography } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState<string | false>(false);

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
              <Grid item xs={2} sm={4} md={4} key={index} flexDirection="row" alignItems="center" display="flex">
                <Typography variant="body1">{item.displayName}</Typography>
                {item.component}
              </Grid>
))}
    </>
  }

  const renderBasicFilters = (filters: Filter[]) => {
    return <>
            {filters.map((item) => (
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
                      {item.component}
                      </Box>
                  </AccordionDetails>
                </Accordion>
            ))}
    </>
  }

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{maxHeight: '91vh', overflow: 'auto'}}>
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
          <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 2, sm: 3, md: 8 }} justifyContent="center" padding="0 16px" marginTop="5px">
            {renderLifeStyleFilters(LifeStyleFilters)}
          </Grid>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;