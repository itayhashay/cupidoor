import { Box, Button, Fab, Typography } from "@mui/material";
import { LANDLORD_PROPERTIES } from "../../utils/mock";
import GenericHousesList from "../GenericHousesList";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import AddProperty from "../AddProperty";
import { useState } from "react";

const MyProperties = () => {
    const [open, setOpen] = useState(false);

    return (
    <Box>
        {LANDLORD_PROPERTIES.length > 0 ? <GenericHousesList apartments={LANDLORD_PROPERTIES}/> :
        <Box height="85%" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="0 45px">
            <Box display="flex" flexDirection="column" alignItems="flex-start" justifyContent="space-evenly" height="60vh">
                <Typography variant="h2" fontWeight="700">
                    List Your Propery Today!
                </Typography>
                <Typography variant="h6" fontWeight="300">
                    By uploading your apartment for rent you expose it to other tenants.
                </Typography>
                <Button variant="contained" onClick={() => setOpen(true)} endIcon={<AddHomeOutlinedIcon />}>
                    Add Apartment
                </Button>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <img alt="" src="/rent-house.jpeg" style={{ height: "60vh", width: "80vh" }}/>
            </Box>
        </Box>}
        {LANDLORD_PROPERTIES.length > 0 && <Fab color="primary" variant="extended" sx={{position: "fixed", bottom: "20px", left: "28px"}} onClick={() => setOpen(true)}>
            {`Add New Property`}
            <AddHomeOutlinedIcon sx={{ ml: 1 }} />
        </Fab>}
        <AddProperty isOpen={open} onClose={() => setOpen(false)}/>
    </Box>);
}
 
export default MyProperties;