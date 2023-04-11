import { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { DividerLine, cardStyles, AvatarStyles, CardContentStyles, MatchLabelStyles } from "./styles";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { Apartment } from "../../types/apartment";
import UserImg from "../../icons/user.jpeg"
import { Link } from "react-router-dom";

const HouseCard = ({ houseData }: { houseData: Apartment }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
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
      
      <CardContent
        sx={CardContentStyles}
      >
        <Typography
        sx={MatchLabelStyles}
      >{`${houseData.match}% Match`}</Typography>
        <Typography variant="body2" color="text.secondary">
        <b>Address:</b> {houseData.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <b>Floor:</b> {houseData.floor}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Rooms:</b> {houseData.rooms}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Parking:</b> {houseData.parkings}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>Price:</b> {houseData.paymentsCond.rent} ₪
        </Typography>
      </CardContent>
      <DividerLine />
      <CardActions
        disableSpacing
        sx={{
          position: "absolute",
          bottom: 0,
          width: "calc(100% - 16px);",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          aria-label="share"
          onClick={() => {}}
        >
          <ThumbUpIcon color="primary" />
        </IconButton>
        <Link to={`/apartment/${houseData.id}`}>
          <Button sx={{ color: "#757575" }}>
            More details
          </Button>
        </Link>
        <IconButton aria-label="add to favorites" onClick={() => {}}>
          <FavoriteIcon color="error"/>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default HouseCard;
