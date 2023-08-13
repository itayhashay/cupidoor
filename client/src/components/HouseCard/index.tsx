import { SyntheticEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, Avatar, Typography, Skeleton } from '@mui/material';
import { Box, CircularProgress, Divider, Fab, Grid, Icon, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import StairsIcon from '@mui/icons-material/Stairs';
import LikedUsers from '../ApartmentDetails/LikedUsers';
import { precentToColor } from '../../utils/colors';
import {
  cardStyles,
  AvatarStyles,
  MatchLabelStyles,
  addressStyles,
  likeButtonStyles,
} from './styles';
import { Apartment } from '../../types/apartment';
import useAPI from '../../hooks/useAPI';
// import AddProperty from '../AddProperty';
import AddProperty from '../AddPropertyTest';
import { useConfirmationModal } from '../../context/ConfirmationModalContext';
import DeleteApartmentDialog from '../DeleteApartmentDialog';

const HouseCard = ({
  houseData,
  isMyProperties,
  fetchApartments,
}: {
  houseData: Apartment;
  isMyProperties: boolean;
  fetchApartments?: VoidFunction;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isMatched, setIsMatched] = useState<boolean>(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [matchColor, setMatchColor] = useState<string>('');
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { toggleTenantLike } = useAPI();
  const { showConfirmationModal } = useConfirmationModal();

  useEffect(() => {
    const color: string = precentToColor(houseData.match || 0);
    setMatchColor(color);
  }, [houseData]);

  useEffect(() => {
    setIsFavorite(houseData.liked as boolean);
    setIsMatched(houseData.matched as boolean);
  }, [houseData]);

  const handleClickFavorite = async (event: Event | SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    let flag = true;
    if (isMatched) {
      flag = await showConfirmationModal({
        title: `Unmatch ${houseData.city},${houseData.street} ${houseData.houseNumber}`,
        message: 'Are you sure you want to unmatch?',
        severity: 'info',
        show: true,
      });
    }
    if (flag) {
      setIsFavoriteLoading(true);
      await toggleTenantLike(houseData._id, String(houseData.user._id));
      setIsFavoriteLoading(false);
      if (isMatched) return setIsMatched(false);
      setIsFavorite((prev) => !prev);
    }
  };

  const handleClickEdit = async (event: Event | SyntheticEvent<Element, Event>) => {
    event.preventDefault();

    setEditOpen(true);
  };
  const handleDeleteClick = async (event: Event | SyntheticEvent<Element, Event>) => {
    event.preventDefault();

    setDeleteOpen(true);
  };
  const closeDeleteDialog = () => {
    setDeleteOpen(false);
  };

  const handleApartmentSave = () => {
    window.location.reload();
  };

  return (
    <>
      <Link to={`/apartment/${houseData._id}`}>
        <Card sx={cardStyles}>
          {isLoading && (
            <Skeleton animation='wave' variant='rectangular' width={'100%'} height={220} />
          )}
          <CardMedia
            component='img'
            height='220'
            sx={{ display: isLoading ? 'none' : 'block' }}
            image={houseData.images[0] ? houseData.images[0].url : '/apartmentPlaceholder.png'}
            onLoad={() => setIsLoading(false)}
          />

          <Tooltip
            title={`${houseData.user.firstName} ${houseData.user.lastName}`}
            placement='bottom'
          >
            <Avatar alt='' src={houseData.user.avatar} sx={AvatarStyles} />
          </Tooltip>

          {!isMyProperties ? (
            <Fab sx={likeButtonStyles} onClick={handleClickFavorite} id='favorite-button'>
              {isFavoriteLoading ? (
                <CircularProgress color='error'></CircularProgress>
              ) : isFavorite ? (
                <Tooltip title='Liked'>
                  <FavoriteIcon />
                </Tooltip>
              ) : isMatched ? (
                <Tooltip title='Matched'>
                  <FavoriteIcon color='error'></FavoriteIcon>
                </Tooltip>
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </Fab>
          ) : (
            <>
              <Fab
                sx={likeButtonStyles}
                onClick={handleClickEdit}
                id='edit-button'
                style={{ right: 60 }}
              >
                {<EditIcon />}
              </Fab>
              <Fab sx={likeButtonStyles} onClick={handleDeleteClick} id='delete-button'>
                {<DeleteIcon />}
              </Fab>
            </>
          )}
          {!isMyProperties ? (
            <Typography sx={{ ...MatchLabelStyles, color: matchColor }}>{`${houseData.match}% ${
              houseData.match === 100 ? 'Perfect' : ''
            } Match${houseData.match === 100 ? '!' : ''}`}</Typography>
          ) : (
            <Typography
              sx={{ ...MatchLabelStyles, color: 'rgba(0, 0, 0, 0.6)' }}
              display='flex'
              flexDirection='row'
              justifyContent='center'
              alignItems='center'
            >
              {/* <FavoriteIcon sx={{ margin: "0 5px", color: "red" }} />
            <Typography margin={"0 5px"}>15</Typography> */}
            </Typography>
          )}

          <Box display={'flex'} paddingX={1}>
            <Box display={'flex'} alignItems={'center'}>
              <LocationOnIcon></LocationOnIcon>
              <Typography
                variant='body1'
                ml={1}
                sx={addressStyles}
                color='text.primary'
                fontWeight={'bold'}
                title={houseData.city}
              >
                {houseData.city}, {houseData.street} {houseData.houseNumber}
              </Typography>
            </Box>
          </Box>

          <Divider light sx={{ my: 1 }}></Divider>

          <Grid container padding={1}>
            <Grid item xs>
              <Box display={'flex'} alignItems={'center'}>
                <Avatar sx={{ bgcolor: '#3845653d', width: 32, height: 32 }}>
                  <MeetingRoomIcon color='primary'></MeetingRoomIcon>
                </Avatar>
                <Typography ml={0.5} variant='subtitle2' color={'GrayText'}>
                  {houseData.rooms} rooms
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box display={'flex'} alignItems={'center'}>
                <Avatar sx={{ bgcolor: '#3845653d', width: 32, height: 32 }}>
                  <SquareFootIcon color='primary'></SquareFootIcon>
                </Avatar>
                <Typography ml={0.5} variant='subtitle2' color={'GrayText'}>
                  {houseData.houseArea}
                </Typography>
                <Typography variant='body1' color='GrayText' fontSize={'0.9em'} fontWeight={'bold'}>
                  &#13217;
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display={'flex'} alignItems={'center'}>
                <Avatar sx={{ bgcolor: '#3845653d', width: 32, height: 32 }}>
                  <StairsIcon color='primary'></StairsIcon>
                </Avatar>
                <Typography ml={0.5} variant='subtitle2' color={'GrayText'}>
                  Floor {houseData.floor}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* {!isMyProperties && (
            <DryDetails apartmentInfo={houseData} isBasicData={true} />
          )} */}

          <Box width={'100%'} mt={1}>
            {isMyProperties ? (
              <LikedUsers users={houseData.likes} />
            ) : (
              <>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  bgcolor={'primary.light'}
                  paddingY={1}
                >
                  <Icon></Icon>
                  <Typography
                    textAlign={'center'}
                    fontWeight={'bold'}
                    color={'white'}
                    fontSize={16}
                  >
                    ₪{houseData.price}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Card>
      </Link>
      {deleteOpen && (
        <DeleteApartmentDialog
          apartmentDetails={houseData}
          handleClose={closeDeleteDialog}
          fetchApartments={fetchApartments as VoidFunction}
        />
      )}
      <AddProperty
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        handleSave={handleApartmentSave}
        houseData={houseData}
        isEdit={true}
      />
    </>
  );
};

export default HouseCard;
