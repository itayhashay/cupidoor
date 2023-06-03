import { makeStyles } from "@mui/styles";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import { DividerLine, LogoImg, UserSection } from "./styles";
import Logo from "../../icons/logo.png";
import UserImg from "../../icons/user.jpeg";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USER_ROUTES } from "../UserRouter/constants";

const useStyles = makeStyles({
  linkStyle: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 35,
    padding: "0 30px",
    textAlign: "center",
  },
});

export const Navbar = () => {
  const { user, setUser } = useAuth();
  const classes = useStyles();

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
                  <Avatar alt="" src={UserImg} />
                </Link>
              </>
            ) : (
              <>
                <Button>
                  <Link to={"/signIn"} className={classes.linkStyle}>
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
