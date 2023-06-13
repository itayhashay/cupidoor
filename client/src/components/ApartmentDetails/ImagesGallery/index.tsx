import ImageGallery from 'react-image-gallery';
import "./styles.scss";
import "./styles.css";
import { HOUSES_IMAGES } from '../../../utils/mock';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';

const images = HOUSES_IMAGES.slice(0, 15).map(imageUrl => {
  return {
    original: imageUrl,
    thumbnail: imageUrl,
    originalHeight: 400,
    originalWidth: 540,
  }
});

const navLeftButtonStyle = {
  position: "absolute",
  zIndex: "1",
  padding: "50px 10px",
  top: "50%",
  transform: "translateY(-50%)"
}

const navRightButtonStyle = {
  position: "absolute",
  zIndex: "1",
  padding: "50px 10px",
  top: "50%",
  right: "0", 
  transform: "translateY(-50%)"
}


const ImagesGallery = () => {

  return (
       <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} showIndex={true} 
       renderLeftNav={(onClick, disabled) => (
        <Button onClick={onClick} disabled={disabled} sx={navLeftButtonStyle} disableRipple={true}>
          <ArrowBackIosNewIcon  fontSize='large' sx={{ color: "white", fontSize: "54px"}}/>
        </Button>
      )}
      renderRightNav={(onClick, disabled) => (
        <Button onClick={onClick} disabled={disabled} sx={navRightButtonStyle} disableRipple={true}>
          <ArrowForwardIosIcon  fontSize='large' sx={{ color: "white", fontSize: "54px"}}/>
        </Button>
      )}/>
  );
}

export default ImagesGallery;