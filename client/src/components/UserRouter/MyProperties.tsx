import { Box, Fab } from "@mui/material";
import { LANDLORD_PROPERTIES } from "../../utils/mock";
import GenericHousesList from "../GenericHousesList";
import NavigationIcon from '@mui/icons-material/Navigation';

const MyProperties = () => {
    return (
    <Box>
        <GenericHousesList apartments={LANDLORD_PROPERTIES}/>
        <Fab variant="extended" sx={{bottom: "10px", left: "20px"}}>
            <NavigationIcon sx={{ mr: 1 }} />
            Navigate
        </Fab>
    </Box>);
}
 
export default MyProperties;