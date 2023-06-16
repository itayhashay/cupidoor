import { AppBar, Box, Toolbar, Button, Grid, Menu, CssBaseline } from "@mui/material";
import { Avatar, Typography, MenuItem } from "@mui/material";
import { UserSection, linkStyles } from "./styles";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USER_ROUTES } from "../UserRouter/constants";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Logo from "../../icons/logo.svg";
import LogoWhite from "../../icons/logo-white.svg";

export const Navbar = () => {
  const { user, setUser, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [navbarBGcolor, setNavbarBGcolor] = useState<string>("#e7e6f0");
  const [navbarColor, setNavbarColor] = useState<string>("#434336");

  useEffect(() => {
    if (location.pathname === "/") {
      setNavbarBGcolor("#e7e6f0");
      setNavbarColor("#434336");
    } else {
      setNavbarBGcolor("#e7e6f0");
      setNavbarColor("#fff");
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      setNavbarBGcolor("#e7e6f0");
      setNavbarColor("#434336");
    } else {
      setNavbarBGcolor("#e7e6f0");
      setNavbarColor("#434336");
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
    if (location.pathname !== "/user/personal-info")
      navigate("/user/personal-info");
  };

  const handleSignOut = () => {
    signOutUser();
  };

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: "0", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <AppBar
        sx={{
          position: "static",
          bgcolor: navbarBGcolor,
          color: navbarColor,
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid item xs={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Link to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}>
                  <img src={location.pathname === "/" ? Logo : LogoWhite} alt="logo" style={{ height: "4rem", marginRight: "1rem" }}/>
                </Link>
                <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                  Cupidoor
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
             
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <UserSection>
                  {user ? (
                    <>
                      <Typography
                        variant="h6"
                        sx={{ marginRight: "16px" }}
                      >{`Hello ${user.firstName}`}</Typography>
                      <Link to={"/user/personal-info"}></Link>
                      <Avatar
                        id="avatar-menu-button"
                        alt={user.name}
                        src={user?.avatar}
                        sx={{ cursor: "pointer" }}
                        onClick={handleMenuClick}
                      />
                      <Menu
                        id="avatar-menu"
                        aria-labelledby="avatar-menu-button"
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                      >
                        <MenuItem
                          onClick={handleAccountNavigation}
                          sx={{ mb: 1 }}
                        >
                          <AccountCircleIcon sx={{ mr: 1 }}></AccountCircleIcon>{" "}
                          Account
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                          <LogoutIcon sx={{ mr: 1 }}></LogoutIcon>
                          Sign Out
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button sx={linkStyles}>
                        <Typography
                          component={Link}
                          to={"/signIn"}
                          sx={{ color: "white" }}
                        >
                          Sign In
                        </Typography>
                      </Button>
                    </>
                  )}
                </UserSection>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
