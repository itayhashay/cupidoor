import { Avatar, Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AvatarConatiner } from "./styles";
import UserImg from "../../icons/user.jpeg"
import { User } from "../../types/user";

const LandlordSection = (landlord: User) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto'}}>
            <AvatarConatiner>
                <Typography variant="h6" sx={{ fontWeight: '400', fontSize: '18px', marginBottom: '5px', whiteSpace: 'nowrap'}}>
                    {`${landlord.firstName} ${landlord.lastName}`}
                </Typography>
                <Avatar alt="" src={UserImg} sx={{}}/>
            </AvatarConatiner>
            <Divider orientation="vertical" variant="middle" flexItem sx={{margin: '0 12px'}}/>
            <Typography variant="subtitle1">{landlord.familiarity}</Typography>
        </Box>
    );
}
 
export default LandlordSection;