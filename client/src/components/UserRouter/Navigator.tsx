import { Breadcrumbs, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { NavContainer } from "./styles";

const Navigator = () => {
    const breadcrumbs = [
        <Link to={"personal-info"}>
            <Button sx={{ color: "#757575" }}>
            Personal Info
            </Button>
        </Link>,        
        <Link to={"liked-apartments"}>
            <Button sx={{ color: "#757575" }}>
            Liked Apartments
            </Button>
        </Link>,
        <Link to={"my-properties"}>
            <Button sx={{ color: "#757575" }}>
            My Apartments
            </Button>
        </Link>    
    ]

    return (
        <NavContainer>
            <Breadcrumbs separator="|" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
        </NavContainer>
    );
}
 
export default Navigator;