import { AppBar, Box, Toolbar, Button, Menu, MenuItem } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import { DividerLine, LogoImg, UserSection, linkStyles } from "./styles";
import Logo from "../../icons/logo.png";
import UserImg from "../../icons/user.jpeg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USER_ROUTES } from "../UserRouter/constants";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export const Navbar = () => {
  const { user, setUser, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
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
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}>
            <LogoImg src={Logo} alt="logo" />
          </Link>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Cupidoor
          </Typography>
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
                  sx={{cursor:"pointer"}}
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
                  <MenuItem onClick={handleAccountNavigation} sx={{ mb: 1 }}>
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
                  <Link to={"/signIn"}>Sign In</Link>
                </Button>
              </>
            )}
          </UserSection>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
