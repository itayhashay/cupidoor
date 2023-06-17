import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  Avatar,
  Skeleton,
  Icon,
  Modal,
  Button,
} from "@mui/material";
import { Box, Divider, Fab, Grid, Typography, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import EditIcon from "@mui/icons-material/Edit";
import LikedUsers from "../ApartmentDetails/LikedUsers";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StairsIcon from "@mui/icons-material/Stairs";
import { addressStyles, likeButtonStyles } from "./styles";
import { cardStyles, AvatarStyles, MatchLabelStyles } from "./styles";
import { Apartment } from "../../types/apartment";
import { precentToColor } from "../../utils/colors";
import { getUserId } from "../../utils/localStorage";
import { randomNumber } from "../../utils/random";
import useAPI from "../../hooks/useAPI";
import { User } from "../../types/user";
import LikersModalList from "../LikersModal/likersModal";
import { Height } from "@mui/icons-material";
import { relative } from "path";

const HouseCard = ({
  houseData,
  isMyProperties,
}: {
  houseData: Apartment;
  isMyProperties: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [matchColor, setMatchColor] = useState<string>("");
  const [usersArr, setUsersArr] = useState<User[]>([]);
  const [displayLikersModal, setDisplayLikersModal] = useState<boolean>(false);
  const match: number = randomNumber(0, 100);
  const { getUserLikedApartments, toggleTenantLike, getAllUsers } = useAPI();

  // Futurly have house.likes
  async function fetchAllUsersForMock(): Promise<User[]> {
    const appartmentLikesArr: User[] = await getAllUsers();
    return appartmentLikesArr;
  }

  useEffect(() => {
    fetchAllUsersForMock().then((allUsers) => {
      setUsersArr(allUsers);
    });
  }, []);

  const openLikersModal = () => setDisplayLikersModal(true);
  const closeLikersModal = () => setDisplayLikersModal(false);

  // const fetchLikedApartments = async (userId: string) => {
  //   const likes: any[] = await getUserLikedApartments(userId);
  //   const apartmentsIds: string[] = likes.map(like => like.apartment);
  //   return apartmentsIds;
  // }

  useEffect(() => {
    const color: string = precentToColor(match);
    setMatchColor(color);

    const apartmentId: string = houseData._id;
    const userId: string = getUserId();

    // fetchLikedApartments(userId).then((likedApartmentsIds: string[]) => {
    //   setIsFavorite(likedApartmentsIds.includes(apartmentId));
    // })
  }, [houseData]);

  const handleClickFavorite = async (
    event: Event | SyntheticEvent<Element, Event>
  ) => {
    event.preventDefault();

    await toggleTenantLike(houseData._id, String(houseData.user._id));

    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <Link to={`/apartment/${houseData._id}`}>
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
              image={houseData.images[0] && houseData.images[0].url}
              alt="Paella dish"
            />
          )}
          <Tooltip
            title={`${houseData.user.firstName} ${houseData.user.lastName}`}
            placement="bottom"
          >
            <Avatar alt="" src={houseData.user.avatar} sx={AvatarStyles} />
          </Tooltip>

          {!isMyProperties ? (
            <Fab
              sx={likeButtonStyles}
              onClick={handleClickFavorite}
              id="favorite-button"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
            </Fab>
          ) : (
            <Fab
              sx={likeButtonStyles}
              onClick={handleClickFavorite}
              id="favorite-button"
            >
              {<EditIcon />}
            </Fab>
          )}
          {!isMyProperties ? (
            <Typography
              sx={{ ...MatchLabelStyles, color: matchColor }}
            >{`${match}% ${match === 100 ? "Perfect" : ""} Match${
              match === 100 ? "!" : ""
            }`}</Typography>
          ) : (
            <Typography
              sx={{ ...MatchLabelStyles, color: "rgba(0, 0, 0, 0.6)" }}
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* <FavoriteIcon sx={{ margin: "0 5px", color: "red" }} />
            <Typography margin={"0 5px"}>15</Typography> */}
            </Typography>
          )}

          <Box display={"flex"} paddingX={1}>
            <Box display={"flex"} alignItems={"center"}>
              <LocationOnIcon></LocationOnIcon>
              <Typography
                variant="body1"
                ml={1}
                sx={addressStyles}
                color="text.primary"
                fontWeight={"bold"}
                title={houseData.city}
              >
                {houseData.city}, {houseData.street} {houseData.houseNumber}
              </Typography>
            </Box>
          </Box>

          <Divider light sx={{ my: 1 }}></Divider>

          <Grid container padding={1}>
            <Grid item xs>
              <Box display={"flex"} alignItems={"center"}>
                <MeetingRoomIcon color="secondary"></MeetingRoomIcon>
                <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
                  {houseData.rooms} rooms
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box display={"flex"} alignItems={"center"}>
                <SquareFootIcon color="secondary"></SquareFootIcon>
                <Typography ml={0.5} variant="subtitle2" color={"GrayText"}>
                  {houseData.houseArea}
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
                <StairsIcon color="secondary"></StairsIcon>
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
              <Link to={""} onClick={openLikersModal}>
                <LikedUsers users={usersArr} />
              </Link>
            ) : (
              <>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  bgcolor={"primary.dark"}
                  paddingY={1}
                >
                  <Icon />
                  <Typography
                    textAlign={"center"}
                    fontWeight={"bold"}
                    color={"white"}
                    fontSize={16}
                  >
                    ₪{houseData.cost}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Card>
      </Link>
      <Modal
        open={displayLikersModal}
        onClose={closeLikersModal}
        sx={{
          boxShadow: 24,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <div
            id="modal-wrapper"
            style={{
              display: "grid",
              gridTemplateRows: "auto auto 1fr auto",
              height: 550,
              width: 800,
              backgroundColor: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{ display: "flex", justifyContent: "center", paddingTop: 1 }}
            >
              People who liked your apartment
            </Typography>
            <LikersModalList users={usersArr} />
            <div
              id="close-btn-wrapper"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={closeLikersModal}
                sx={{ width: "30%" }}
              >
                Close
              </Button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default HouseCard;
