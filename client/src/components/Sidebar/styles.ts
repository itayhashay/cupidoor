import { styled as materialStyle } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import styled from "styled-components";

export const FilterIcon = styled.img`
  height: 25px;
  width: 25px;
`;

export const MenuItemIcon = materialStyle("img")(() => ({}));

const drawerWidth = 270;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const DrawerHeader = materialStyle("div")(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "flex-end",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  height: "35px",
  padding: "8px 12px 0 12px",
  minHeight: "auto !important",
}));

export const Drawer = materialStyle(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }: any) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
