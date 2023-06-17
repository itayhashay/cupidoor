import Typography from '@mui/material/Typography';
import { Apartment } from '../../types/apartment';
import { NumbersSection, PropertyIcon, numbersPropertyStyles } from './styles';
import { Box, Grid, Stack } from '@mui/material';
import RoomsIcon from '../../icons/apartment/rooms.png';
import FloorIcon from '../../icons/apartment/floor.png';
import Mr2Icon from '../../icons/apartment/mr.png';
import ParkingIcon from '../../icons/apartment/parking.png';
import BalconyIcon from '@mui/icons-material/Balcony';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import StairsIcon from '@mui/icons-material/Stairs';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
type DryDetailsProps = { apartmentInfo: Apartment; isBasicData?: boolean };

const DryDetails = ({ apartmentInfo, isBasicData = false }: DryDetailsProps) => {
  const basicDataDisplay: string = isBasicData ? 'none' : 'flex';

  const data = [
    {
      icon: <MeetingRoomIcon color='primary'></MeetingRoomIcon>,
      value: `${apartmentInfo.rooms} rooms`,
    },
    {
      icon: <SquareFootIcon color='primary'></SquareFootIcon>,
      value: `${apartmentInfo.houseArea} m\u00B2`,
    },
    {
      icon: <StairsIcon color='primary'></StairsIcon>,
      value: `Floor ${apartmentInfo.floor}`,
    },
    {
      icon: <BalconyIcon color='primary'></BalconyIcon>,
      value: `${apartmentInfo.balconies} Balconies`,
    },
    {
      icon: <LocalParkingIcon color='primary'></LocalParkingIcon>,
      value: `${apartmentInfo.parkings} Parkings`,
    },
  ];

  return (
    <>
      <Grid container padding={1} bgcolor={'#F5F5F5'} borderRadius={3} wrap='wrap'>
        {data.map((feature) => (
          <Grid item xs={12} sm={6} md key={feature.value}>
            <Box display={'flex'} alignItems={'center'} whiteSpace={'nowrap'}>
              {feature.icon}
              <Typography ml={0.5} variant='subtitle2' color={'GrayText'}>
                {feature.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DryDetails;
