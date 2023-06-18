import { Avatar, Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { User } from '../../types/user';
import { LandlordPictureContainer, ProfilePicture, ProfilePictureContainer } from '../UserRouter/styles';

const LandlordSection = ({ landlord }: { landlord: User }) => {
  return (
    <>
      <Typography variant='h6'>Contact Info</Typography>
      <Divider></Divider>
      <Box padding={2}>
        <div style={{ height: '307px' }}>
          <Box
            display={'flex'}
            sx={{ ...LandlordPictureContainer }}
            justifyContent={'center'}
            textAlign={'center'}
          >
            <div style={{ position: 'relative', top: '105px' }}>
              <Box display={'flex'} justifyContent={'center'} position={'relative'}>
                <Avatar
                  src={landlord.avatar}
                  sx={{ ...ProfilePicture }}
                  style={{ border: '3px solid white' }}
                ></Avatar>
              </Box>

              <div>
                <Typography variant='body1' fontWeight={'bold'} fontSize={'1.5em'}>
                  {`${landlord.firstName} ${landlord.lastName}`}
                </Typography>
              </div>
            </div>
          </Box>
        </div>

        <Box>
          <Typography variant='body2' fontSize={'16px'}>
            {landlord.description}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LandlordSection;
