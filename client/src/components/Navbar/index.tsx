import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import { DividerLine, LogoImg, UserSection, linkStyles } from "./styles";
import Logo from "../../icons/logo.png";
import UserImg from "../../icons/user.jpeg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USER_ROUTES } from "../UserRouter/constants";

export const Navbar = () => {
  const { user, setUser } = useAuth();

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
                <Link to={"/user/personal-info"}>
                  <Avatar alt="" src={user?.avatar} />
                </Link>
              </>
            ) : (
              <>
                <Button sx={linkStyles}>
                  <Link to={"/signIn"} >
                    Sign In
                  </Link>
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
