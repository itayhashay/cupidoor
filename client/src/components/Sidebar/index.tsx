import { useState } from "react";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Drawer, DrawerHeader, FilterIcon } from "./styles";
import { BasicFilters } from "../../utils/filters";
import { Box, Tooltip, Typography } from "@mui/material";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const ToogleDrawer = () => {
    setOpen(!open);
  };

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
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Typography variant="h5" sx={{ marginLeft: "5px", visibility: open ? "visible" : "hidden"}}>
            Filters
          </Typography>
        </DrawerHeader>
        <List>
        {BasicFilters.map((item) => (
              <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
                  <Box
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
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
                    <Box sx={{ visibility: open ? "visible" : "hidden", padding: "0 5px"}} >
                    {item.component}
                    </Box>

                  </Box>
                  <Divider sx={{margin: "0 auto 8px auto", width: "90%"}}/>
              </ListItem>
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
