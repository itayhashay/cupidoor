import { AppBar, Box, Toolbar, Button, Grid, MenuItem } from "@mui/material";
import { Avatar, Typography } from "@mui/material";
import { LogoImg, UserSection, linkStyles } from "./styles";
import Logo from "../../icons/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { USER_ROUTES } from "../UserRouter/constants";

export const Navbar = () => {
  const { user, setUser } = useAuth();

  return (
    <Box sx={{ flexGrow: 1, position: "sticky", top: "0", zIndex: "100" }}>
      <AppBar sx={{ position: "static" }}>
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
                  <LogoImg src={Logo} alt="logo" />
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MenuItem>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    About
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    How it works
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Contact
                  </Typography>
                </MenuItem>
              </Box>
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
                      <Link to={"/user/personal-info"}>
                        <Avatar alt="" src={user?.avatar} />
                      </Link>
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
