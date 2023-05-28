import { SyntheticEvent, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { DividerLine, cardStyles, AvatarStyles, CardContentStyles, MatchLabelStyles, addressStyles, likeButtonStyles } from "./styles";
import Skeleton from "@mui/material/Skeleton";
import { Apartment } from "../../types/apartment";
import { Link } from "react-router-dom";
import DryDetails from "../ApartmentDetails/DryDetails";
import { Box, Fab } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { precentToColor } from "../../utils/colors";
import { HOUSES_IMAGES, PROFILE_PICTURES, TANENT_MOCK } from "../../utils/mock";
import LikedUsers from "../ApartmentDetails/LikedUsers";

const HouseCard = ({ houseData, isMyProperties }: { houseData: Apartment, isMyProperties: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchColor, setMatchColor] = useState<string>("");

  useEffect(() => {
    const color: string = precentToColor(houseData.match);
    setMatchColor(color);
  }, [houseData]);

  const handleClickFavorite = (event: Event | SyntheticEvent<Element, Event>) => {
    
  }

  return (
    <Link to={`/apartment/${houseData.id}`}>
      <Card sx={cardStyles}>
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width={256}
            height={194}
          />
        ) : (
          <CardMedia
            component="img"
            height="194"
            image={HOUSES_IMAGES[houseData.id-1]}
            alt="Paella dish"
          />
        )}
        <Avatar alt="" src={PROFILE_PICTURES[houseData.id-1]} sx={AvatarStyles}/>
        {!isMyProperties && <Fab sx={likeButtonStyles} onClick={handleClickFavorite}>
          {true ? <FavoriteBorderOutlinedIcon /> :<FavoriteIcon />}
        </Fab>}
        {!isMyProperties ? <Typography
          sx={{...MatchLabelStyles, color: matchColor }}
        >{`${houseData.match}% ${houseData.match === 100 ? 'Perfect' : ''} Match${houseData.match === 100 ? '!' : ''}`}</Typography> :         
        <Typography sx={{...MatchLabelStyles, color: "rgba(0, 0, 0, 0.6)" }} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
            <FavoriteIcon sx={{margin: "0 5px", color: "red"}}/>
            <Typography margin={"0 5px"} >15</Typography>
        </Typography>}
        <CardContent
          sx={CardContentStyles}
        >
          <Typography sx={addressStyles} color="text.secondary" title="hey">
            {houseData.address}
          </Typography>
          {!isMyProperties && <DryDetails apartmentInfo={houseData} isBasicData={true}/> }
          <Box sx={{margin: "8px 0", height: "fit-content"}}>
          {isMyProperties ? <LikedUsers users={[TANENT_MOCK, TANENT_MOCK, TANENT_MOCK]} /> :
            <Typography sx={{ fontWeight: '400', fontSize: '20px', textAlign: 'center'}}>
            ₪ {houseData.rent}
            </Typography>}
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HouseCard;
