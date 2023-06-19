import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import './styles.scss';
import './styles.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import { ServerApartmentImages } from '../../../types/apartment';
import { useState, useEffect } from 'react';

// const images = HOUSES_IMAGES.slice(0, 15).map(imageUrl => {
//   return {
//     original: imageUrl,
//     thumbnail: imageUrl,
//     originalHeight: 400,
//     originalWidth: 540,
//   }
// });

const navLeftButtonStyle = {
  position: 'absolute',
  zIndex: '1',
  padding: '50px 10px',
  top: '50%',
  transform: 'translateY(-50%)',
};

const navRightButtonStyle = {
  position: 'absolute',
  zIndex: '1',
  padding: '50px 10px',
  top: '50%',
  right: '0',
  transform: 'translateY(-50%)',
};

const ImagesGallery = ({ images }: { images: ServerApartmentImages[] }) => {
  const [imagesArray, setImagesArray] = useState<ReactImageGalleryItem[]>([]);

  useEffect(() => {
    const newImages = images.map((image) => {
      return {
        original: image.url,
        thumbnail: image.url,
        originalHeight: 400,
        originalWidth: 540,
      };
    });
    setImagesArray(newImages);
  }, [images]);
  return (
    <ImageGallery
      items={imagesArray}
      showFullscreenButton={false}
      showThumbnails={false}
      showPlayButton={false}
      lazyLoad={true}
      showIndex={true}
      renderLeftNav={(onClick, disabled) => (
        <Button onClick={onClick} disabled={disabled} sx={navLeftButtonStyle} disableRipple={true}>
          <ArrowBackIosNewIcon fontSize='large' sx={{ color: 'white', fontSize: '54px' }} />
        </Button>
      )}
      renderRightNav={(onClick, disabled) => (
        <Button onClick={onClick} disabled={disabled} sx={navRightButtonStyle} disableRipple={true}>
          <ArrowForwardIosIcon fontSize='large' sx={{ color: 'white', fontSize: '54px' }} />
        </Button>
      )}
    />
  );
};

export default ImagesGallery;
