import Typography from "@mui/material/Typography";
import { Apartment } from "../../types/apartment";
import { NumbersPropery, NumbersSection } from "./styles";

const DryDetails = (apartmentInfo: Apartment) => {
    return (
        <>
            <Typography variant="h2" sx={{fontSize: "24px", fontWeight: 400, marginLeft: "15px"}}>
                {apartmentInfo.address}
            </Typography>
            <Typography variant="h4" sx={{fontSize: "16px", marginLeft: "15px"}}>
                {apartmentInfo.propertyCond}
            </Typography>
            <NumbersSection>
                <NumbersPropery>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.rooms}</Typography>
                    <Typography>Rooms</Typography>
                </NumbersPropery>
                <NumbersPropery>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.floor}</Typography>
                    <Typography>Floor</Typography>
                </NumbersPropery>
                <NumbersPropery>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.squareMeter}</Typography>
                    <Typography>M<sup>2</sup></Typography>
                </NumbersPropery>
                <NumbersPropery>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.parkings}</Typography>
                    <Typography>Parking</Typography>
                </NumbersPropery>
                <NumbersPropery>
                    <Typography sx={{fontWeight: 'bold'}}>{apartmentInfo.balcony}</Typography>
                    <Typography>Balcony</Typography>
                </NumbersPropery>
            </NumbersSection>
        </>
    );
}
 
export default DryDetails;