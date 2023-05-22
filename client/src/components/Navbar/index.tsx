import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DividerLine, LogoImg, UserSection } from "./styles";
import Logo from "../../icons/logo.png";
import { User } from "../../types/user";
import { LANDLORD_MOCK, USER_INIT } from "../../utils/mock";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import UserImg from "../../icons/user.jpeg"
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [connectedUser, setConnectedUser] = useState<User>(USER_INIT);

  useEffect(() => {
    // const username = getConnectedUsername();
    setConnectedUser(LANDLORD_MOCK);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={`/home`}>
            <LogoImg src={Logo} alt="logo" />
          </Link>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Cupidoor
          </Typography>
          <UserSection>
            {connectedUser ? 
                <>
                <Typography variant="h6" sx={{marginRight: '16px'}}>{`Hello ${connectedUser.firstName}`}</Typography>
                <Link to={"/user/personal-info"}>
                  <Avatar alt="" src={UserImg}/>
                </Link>
                </> : 
            <>
            <Button color="inherit">Log in</Button>
            <DividerLine />
            <Button color="inherit">Sign up</Button>
            </>
            }
            
          </UserSection>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
