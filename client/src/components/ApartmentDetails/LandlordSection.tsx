import { Avatar, Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { AvatarConatiner } from "./styles";
import { User } from "../../types/user";
import { PROFILE_PICTURES } from "../../utils/mock";

const LandlordSection = ({landlord, apartmentId}:{landlord: User, apartmentId: number}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: 'auto', padding: "10px 0"}}>
            <AvatarConatiner>
                <Typography variant="h6" sx={{ fontWeight: '400', fontSize: '18px', marginBottom: '5px', whiteSpace: 'nowrap'}}>
                    {`${landlord.firstName} ${landlord.lastName}`}
                </Typography>
                <Avatar alt="" src={PROFILE_PICTURES[apartmentId-1]} sx={{}}/>
            </AvatarConatiner>
            <Divider orientation="vertical" variant="middle" flexItem sx={{margin: '0 12px'}}/>
            <Typography variant="subtitle1">{landlord.familiarity}</Typography>
        </Box>
    );
}
 
export default LandlordSection;