import { Breadcrumbs, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { NavContainer } from "./styles";
import { useEffect, useState } from "react";
import { USER_ROUTES, USER_ROUTES_DEFAULT_STATE } from "./constants";

const Navigator = () => {
    const location = useLocation()
    const [navStates, setNavStates] = useState<{[x: string]: boolean;}>(USER_ROUTES_DEFAULT_STATE);

    useEffect(() => {
        const currentUrl: string| undefined = Object.keys(navStates).find(url => location.pathname.includes(url));
        currentUrl && setNavStates({
            ...USER_ROUTES_DEFAULT_STATE,
            [currentUrl]: true
        })
    }, [location])
    
    const breadcrumbs = [
      <Link to={USER_ROUTES.PERSONAL_INFO} key={"PersonalInfo"}>
        <Button
          sx={{
            color: "#757575",
            fontWeight: navStates[USER_ROUTES.PERSONAL_INFO] ? 700 : 400,
          }}
        >
          Personal Info
        </Button>
      </Link>,
      <Link to={USER_ROUTES.LIKED_APARTMENTS} key={"LikedApartments"}>
        <Button
          sx={{
            color: "#757575",
            fontWeight: navStates[USER_ROUTES.LIKED_APARTMENTS] ? 700 : 400,
          }}
        >
          Liked Apartments
        </Button>
      </Link>,
        (
          // (User.role = 'both' || User.role = 'landlord') &&
          true && <Link to={USER_ROUTES.MY_PROPERTIES} key={"MyProperties"}>
            <Button
              sx={{
                color: "#757575",
                fontWeight: navStates[USER_ROUTES.MY_PROPERTIES] ? 700 : 400,
              }}
            >
              My Apartments
            </Button>
          </Link>
        )
    ];

    return (
        <NavContainer>
            <Breadcrumbs separator="|" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </NavContainer>
    );
}
 
export default Navigator;