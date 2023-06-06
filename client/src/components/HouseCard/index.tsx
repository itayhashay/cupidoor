import { SyntheticEvent, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  DividerLine,
  cardStyles,
  AvatarStyles,
  CardContentStyles,
  MatchLabelStyles,
  addressStyles,
  likeButtonStyles,
} from "./styles";
import Skeleton from "@mui/material/Skeleton";
import { Apartment } from "../../types/apartment";
import { Link } from "react-router-dom";
import DryDetails from "../ApartmentDetails/DryDetails";
import {
  Box,
  CardActionArea,
  Divider,
  Fab,
  Grid,
  Icon,
  Tooltip,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { precentToColor } from "../../utils/colors";
import { HOUSES_IMAGES, PROFILE_PICTURES, TANENT_MOCK } from "../../utils/mock";
import LikedUsers from "../ApartmentDetails/LikedUsers";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StairsIcon from "@mui/icons-material/Stairs";

const HouseCard = ({
  houseData,
  isMyProperties,
}: {
  houseData: Apartment;
  isMyProperties: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchColor, setMatchColor] = useState<string>("");

  useEffect(() => {
    const color: string = precentToColor(houseData.match);
    setMatchColor(color);
  }, [houseData]);

  const handleClickFavorite = (
    event: Event | SyntheticEvent<Element, Event>
  ) => {};

  return (
    <Link to={`/apartment/${houseData.id}`}>
      <Card sx={cardStyles}>
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={"100%"}
            height={220}
          />
        ) : (
          <CardMedia
            component="img"
            height="220"
            image={HOUSES_IMAGES[houseData.id - 1]}
            alt="Paella dish"
          />
        )}
        <Tooltip title={houseData.landlord.name} placement="bottom">
          <Avatar
            alt=""
            src={PROFILE_PICTURES[houseData.id - 1]}
            sx={AvatarStyles}
          />
        </Tooltip>

        {!isMyProperties && (
          <Fab sx={likeButtonStyles} onClick={handleClickFavorite}>
            {true ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
          </Fab>
        )}
        {!isMyProperties ? (
          <Typography sx={{ ...MatchLabelStyles, color: matchColor }}>{`${
            houseData.match
          }% ${houseData.match === 100 ? "Perfect" : ""} Match${
            houseData.match === 100 ? "!" : ""
          }`}</Typography>
        ) : (
          <Typography
            sx={{ ...MatchLabelStyles, color: "rgba(0, 0, 0, 0.6)" }}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <FavoriteIcon sx={{ margin: "0 5px", color: "red" }} />
            <Typography margin={"0 5px"}>15</Typography>
          </Typography>
        )}

        <Box display={"flex"} padding={1}>
          <Box display={"flex"} alignItems={"center"}>
            <LocationOnIcon></LocationOnIcon>
            <Typography
              ml={1}
              sx={addressStyles}
              color="text.primary"
              fontWeight={"bold"}
              title={houseData.address}
            >
              {houseData.address}
            </Typography>
          </Box>
        </Box>

        <Divider light sx={{ my: 1 }}></Divider>

        <Grid container padding={1}>
          <Grid item xs>
            <Box display={"flex"} alignItems={"center"}>
              <MeetingRoomIcon color="primary"></MeetingRoomIcon>
              <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
                {houseData.rooms} rooms
              </Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <Box display={"flex"} alignItems={"center"}>
              <SquareFootIcon color="primary"></SquareFootIcon>
              <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
                {houseData.squareMeter}
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
          <Grid item>
            <Box display={"flex"} alignItems={"center"}>
              <StairsIcon color="primary"></StairsIcon>
              <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
                Floor {houseData.floor}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* {!isMyProperties && (
            <DryDetails apartmentInfo={houseData} isBasicData={true} />
          )} */}

        <Box width={"100%"} mt={1}>
          {isMyProperties ? (
            <LikedUsers users={[TANENT_MOCK, TANENT_MOCK, TANENT_MOCK]} />
          ) : (
            <>
              <Box
                display={"flex"}
                justifyContent={"center"}
                bgcolor={"primary.dark"}
                paddingY={1}
              >
                <Icon></Icon>
                <Typography
                  textAlign={"center"}
                  fontWeight={"bold"}
                  color={"white"}
                  fontSize={16}
                >
                  ₪{houseData.rent}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </Link>
  );
};

export default HouseCard;
