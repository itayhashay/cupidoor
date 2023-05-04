import Typography from "@mui/material/Typography";
import { Apartment } from "../../types/apartment";
import { NumbersSection, PropertyIcon, numbersPropertyStyles } from "./styles";
import { Box } from "@mui/material";
import RoomsIcon from "../../icons/aparment/rooms.png";
import FloorIcon from "../../icons/aparment/floor.png";
import Mr2Icon from "../../icons/aparment/mr.png";
import ParkingIcon from "../../icons/aparment/parking.png";
import BalconyIcon from "../../icons/aparment/balcony.png";

type DryDetailsProps = {apartmentInfo: Apartment, isBasicData?: boolean};

const DryDetails = ({apartmentInfo, isBasicData = false} : DryDetailsProps) => {
    const basicDataDisplay :string = isBasicData ? "none": "flex";

    return (
        <>
            <Typography variant="h2" sx={{fontSize: "24px", fontWeight: 400, marginLeft: "15px"}} display={basicDataDisplay}>
                {apartmentInfo.address}
            </Typography>
            <Typography variant="h4" sx={{fontSize: "16px", marginLeft: "15px"}} display={basicDataDisplay}>
                {apartmentInfo.propertyCond}
            </Typography>
            <NumbersSection>
                <Box sx={numbersPropertyStyles} display={"flex"}>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.rooms}</Typography>
                    <PropertyIcon src={RoomsIcon} />
                </Box>
                <Box sx={numbersPropertyStyles} display={"flex"}>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.squareMeter}</Typography>
                    <PropertyIcon src={Mr2Icon} />
                </Box>
                <Box sx={numbersPropertyStyles} display={"flex"}>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.floor}</Typography>
                    <PropertyIcon src={FloorIcon} />
                </Box>
                <Box sx={numbersPropertyStyles} display={basicDataDisplay}>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.parkings}</Typography>
                    <PropertyIcon src={ParkingIcon} />
                </Box>
                <Box sx={numbersPropertyStyles} display={basicDataDisplay}>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.balcony}</Typography>
                    <PropertyIcon src={BalconyIcon} />
                </Box>
            </NumbersSection>
        </>
    );
}
 
export default DryDetails;