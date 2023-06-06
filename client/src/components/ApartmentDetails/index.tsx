import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Apartment } from "../../types/apartment";
import { HOUSES, HOUSE_INIT } from "../../utils/mock";
import DryDetails from "./DryDetails";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StairsIcon from "@mui/icons-material/Stairs";
import {
  ElementsLineOne,
  ImageContainer,
  DryDetailsContainer,
  Frame,
  ElementsLineTwo,
  SubFrame,
} from "./styles";
import PaymentCalculator from "./PaymentCalculator";
import LandlordSection from "./LandlordSection";
import ImagesGallery from "./ImagesGallery";
import { FavoriteBorder } from "@mui/icons-material";
import ApartmentProperties from "./ApartmentProperties";

const ApartmentDetails = () => {
  const [apartmentInfo, setApartmentInfo] = useState<Apartment>(HOUSE_INIT);
  const params = useParams();

  useEffect(() => {
    const fetchApartmentData = async (id: number) => {
      const apartmentData: Apartment | undefined = HOUSES.find(
        (house) => house.id === id
      );
      return apartmentData || HOUSE_INIT;
    };

    const apartmentId: number = parseInt(params.id || "");

    if (apartmentId)
      fetchApartmentData(apartmentId).then((apartment) =>
        setApartmentInfo(apartment)
      );
    else console.log("error");
  }, [params.id]);

  return (
    // TODO: Change last updated mock.
    <Container maxWidth="xl" sx={{ paddingY: 10 }}>
      <Grid container>
        <Grid item xs={12}>
          <ImageContainer className="apartment-gallery">
            <ImagesGallery />
          </ImageContainer>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item md={7} xs={12} padding={1}>
              <DryDetails apartmentInfo={apartmentInfo} />
              <Box mt={1}>
                <ApartmentProperties
                  apartmentInfo={apartmentInfo}
                ></ApartmentProperties>
              </Box>
              <Box display={"flex"} alignItems={"center"} mb={2} mt={1}>
                <LocationOnIcon></LocationOnIcon>
                <Typography
                  variant="body1"
                  fontWeight={"bold"}
                  ml={1}
                  fontSize={20}
                >
                  {apartmentInfo.address}
                </Typography>
              </Box>
              <Box display={"flex"} px={2}>
                <Typography>
                  <b>Description:</b> {apartmentInfo.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={5} xs={12}>
              <Box
                padding={1}
                height={"100%"}
                display={"flex"}
                flexDirection={"column"}
              >
                <Typography variant="h6">Contact Info</Typography>
                <Box padding={2}>
                  <Box display={"flex"} alignItems={"center"} mb={1}>
                    <Avatar
                      src={apartmentInfo.user.avatar}
                      sx={{ width: 56, height: 56 }}
                    ></Avatar>
                    <Box ml={2}>
                      <Typography
                        variant="subtitle2"
                        fontWeight={"bold"}
                        lineHeight={0.5}
                        fontSize={18}
                      >
                        {apartmentInfo.user.name}
                      </Typography>
                      <Typography variant="caption">Owner</Typography>
                    </Box>
                  </Box>
                  <Box padding={1}>
                    <Typography variant="body2" fontSize={"16px"}>
                      {apartmentInfo.user.description}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={"auto"} pb={3}>
                  <Box pb={2} display={"flex"} justifyContent={"space-between"}>
                    <div>
                      <Typography
                        variant="body1"
                        fontWeight={"bolder"}
                        fontSize={16}
                      >
                        Monthly rental:
                      </Typography>
                      <Box display={"flex"} alignItems={"end"} padding={1}>
                        <Typography fontWeight={"bold"} fontSize={18}>
                          ₪{apartmentInfo.cost}
                        </Typography>
                        <Typography color={"GrayText"} fontSize={14}>
                          /month
                        </Typography>
                      </Box>
                    </div>
                    <div>
                      <Typography
                        variant="body1"
                        fontWeight={"bolder"}
                        fontSize={16}
                      >
                        Entrance date:
                      </Typography>
                      <Box display={"flex"} alignItems={"end"}>
                        <Typography
                          fontWeight={"bold"}
                          fontSize={18}
                          padding={1}
                        >
                          {apartmentInfo.entryDate.toLocaleDateString()}
                        </Typography>
                      </Box>
                    </div>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<FavoriteBorder></FavoriteBorder>}
                  >
                    Like
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ApartmentDetails;
