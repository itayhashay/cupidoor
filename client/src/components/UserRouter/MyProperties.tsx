import { Box, Fab } from "@mui/material";
import { LANDLORD_PROPERTIES } from "../../utils/mock";
import GenericHousesList from "../GenericHousesList";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import AddProperty from "./AddProperty";
import { useState } from "react";

const MyProperties = () => {
    const [open, setOpen] = useState(false);

    return (
    <Box>
        <GenericHousesList apartments={LANDLORD_PROPERTIES}/>
        <Fab variant="extended" sx={{bottom: "10px", left: "20px"}} onClick={() => setOpen(true)}>
            {`Add New Property`}
            <AddHomeOutlinedIcon sx={{ ml: 1 }} />
        </Fab>
        <AddProperty isOpen={open} onClose={() => setOpen(false)}/>
    </Box>);
}
 
export default MyProperties;