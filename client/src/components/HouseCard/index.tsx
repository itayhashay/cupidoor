import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { DividerLine, cardStyles, AvatarStyles, CardContentStyles, MatchLabelStyles, addressStyles, likeButtonStyles } from "./styles";
import Skeleton from "@mui/material/Skeleton";
import { Apartment } from "../../types/apartment";
import UserImg from "../../icons/user.jpeg"
import { Link } from "react-router-dom";
import DryDetails from "../ApartmentDetails/DryDetails";
import { Box, Fab } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { precentToColor } from "../../utils/colors";

const HouseCard = ({ houseData }: { houseData: Apartment }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchColor, setMatchColor] = useState<string>("");

  useEffect(() => {
    const color: string = precentToColor(houseData.match);
    setMatchColor(color);
  }, [houseData]);

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
            image={"https://www.apartments.com/images/default-source/2019-naa/parkline-apartment-in-miami-fla2dc2731-e6f2-4dca-89c5-38245ccacea1.tmb-featuredim.jpg?sfvrsn=55bc41ed_1"}
            alt="Paella dish"
          />
        )}
        <Avatar alt="" src={UserImg} sx={AvatarStyles}/>
        <Fab sx={likeButtonStyles}>
          <FavoriteIcon />
        </Fab>
        <Typography
          sx={{...MatchLabelStyles, color: matchColor }}
        >{`${houseData.match}% Match`}</Typography>
        <CardContent
          sx={CardContentStyles}
        >
          <Typography sx={addressStyles} color="text.secondary" title="hey">
            {houseData.address}
          </Typography>
          <DividerLine />
          <DryDetails apartmentInfo={houseData} isBasicData={true}/>
          <Box sx={{margin: "8px 0", height: "fit-content"}}>
            <Typography sx={{ fontWeight: '400', fontSize: '20px', textAlign: 'center'}}>
            ₪ {houseData.rent}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default HouseCard;
