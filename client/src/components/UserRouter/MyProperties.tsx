import { Box, Button, Fab, Typography } from "@mui/material";
import GenericHousesList from "../GenericHousesList";
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';
import AddProperty from "../AddProperty";
import { useEffect, useState } from "react";
import { getUserProperties } from "../../utils/api";
import { getUserId } from "../../utils/localStorage";
import { Apartment } from "../../types/apartment";
import CupidoorSpinner from "../CupidoorSpinner";

const MyProperties = () => {
    const [open, setOpen] = useState(false);
    const [myApartments, setMyApartments] = useState<Apartment[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserProperties = async () => {
        const userId = getUserId();
        const userProperties: Apartment[] = await getUserProperties(userId);
        return userProperties;
    }

    useEffect(() => {
        fetchUserProperties().then((myApartments: Apartment[]) => {
            setMyApartments(myApartments);
            setIsLoading(false);
        })
    }, []);

    return (
    <Box sx={{ overflowY: "auto", position: "relative" }}>

        {isLoading ? <CupidoorSpinner /> : 
        <>
        {myApartments.length > 0 ? <GenericHousesList apartments={myApartments}/> :
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
        </Box>}</>}
        {myApartments.length > 0 && <Fab color="primary" variant="extended" sx={{position: "fixed", bottom: "20px", left: "28px"}} onClick={() => setOpen(true)}>
            {`Add New Property`}
            <AddHomeOutlinedIcon sx={{ ml: 1 }} />
        </Fab>}
        <AddProperty isOpen={open} onClose={() => setOpen(false)}/>
    </Box>);
}
 
export default MyProperties;