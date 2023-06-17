import Typography from "@mui/material/Typography";
import { Apartment } from "../../types/apartment";
import { NumbersSection, PropertyIcon, numbersPropertyStyles } from "./styles";
import { Box, Grid } from "@mui/material";
import RoomsIcon from "../../icons/aparment/rooms.png";
import FloorIcon from "../../icons/aparment/floor.png";
import Mr2Icon from "../../icons/aparment/mr.png";
import ParkingIcon from "../../icons/aparment/parking.png";
import BalconyIcon from "@mui/icons-material/Balcony";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StairsIcon from "@mui/icons-material/Stairs";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
type DryDetailsProps = { apartmentInfo: Apartment; isBasicData?: boolean };

const DryDetails = ({
  apartmentInfo,
  isBasicData = false,
}: DryDetailsProps) => {
  const basicDataDisplay: string = isBasicData ? "none" : "flex";

  return (
    <>
      <Grid container padding={1} bgcolor={"#F5F5F5"} borderRadius={3}>
        <Grid item xs>
          <Box display={"flex"} alignItems={"center"}>
            <MeetingRoomIcon color="primary"></MeetingRoomIcon>
            <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
              {apartmentInfo.rooms} rooms
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Box display={"flex"} alignItems={"center"}>
            <SquareFootIcon color="primary"></SquareFootIcon>
            <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
              {apartmentInfo.houseArea}
            </Typography>
            <Typography
              variant="body1"
              color="GrayText"
              fontSize={"0.9em"}
              fontWeight={"bold"}
            >
              &#13217;
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Box display={"flex"} alignItems={"center"}>
            <StairsIcon color="primary"></StairsIcon>
            <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
              Floor {apartmentInfo.floor}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Box display={"flex"} alignItems={"center"}>
            <BalconyIcon color="primary"></BalconyIcon>
            <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
              {apartmentInfo.balconies} Balconies
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Box display={"flex"} alignItems={"center"}>
            <LocalParkingIcon color="primary"></LocalParkingIcon>
            <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
              {apartmentInfo.parkings} Parkings
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default DryDetails;
