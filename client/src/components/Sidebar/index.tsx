import { useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TuneIcon from '@mui/icons-material/Tune';
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Drawer, DrawerHeader, FilterIcon } from "./styles";
import { BasicFilters, Filter, LifeStyleFilters } from "../../utils/filters";
import { Box, Tooltip, Typography } from "@mui/material";
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

  const renderFilters = (filters: Filter[]) => {
    return <>
            {filters.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                  <Box
                    sx={{
                      minHeight: 48,
                      justifyContent: "initial",
                      display: "flex",
                      px: 2.5,
                      alignItems: "center"
                    }}
                  >
                    <Tooltip title={item.displayName} enterDelay={500} leaveDelay={100}>
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                        }}
                      >
                        <FilterIcon src={item.icon} />
                      </ListItemIcon>
                    </Tooltip>
                    <Box sx={{ padding: "0 5px", display: "flex", justifyContent: 'center'}} >
                    {item.component}
                    </Box>

                  </Box>
                  <Divider sx={{margin: "0 auto 8px auto", width: "90%"}}/>
              </ListItem>
            ))}
    </>
  }

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
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
        <List sx={{ visibility: open ? "visible" : "hidden" }}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ margin: "0px !important" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Basic Filters
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding: '0'}}>
          {renderFilters(BasicFilters)}
        </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ margin: "0px !important" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Life Style Filters</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding: '0'}}>
        {renderFilters(LifeStyleFilters)}
        </AccordionDetails>
      </Accordion>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
