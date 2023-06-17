import { Box, Divider, Grid, Typography } from '@mui/material';
import { Apartment } from '../../types/apartment';

const PaymentCalculator = ({ apartmentInfo }: { apartmentInfo: Apartment }) => {
  return (
    <Grid item xs={12} padding={1}>
      <Typography variant='h6'>Fees & Terms</Typography>
      <Divider sx={{ my: 1 }}></Divider>
      <Grid container padding={1} bgcolor={'#F5F5F5'} borderRadius={3} wrap='wrap' rowSpacing={1}>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant='body2' fontWeight={'bold'} mb={0.1}>
              Monthly rental:
            </Typography>
            <Box display={'flex'}>
              <Typography variant='caption' fontWeight={'bold'}>
                ₪{apartmentInfo.price}
              </Typography>
              <Typography variant='caption' color={'GrayText'}>
                /month
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant='body2' fontWeight={'bold'}>
              Committee:
            </Typography>
            <Box display={'flex'}>
              <Typography variant='caption'>₪{apartmentInfo.committee}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant='body2' fontWeight={'bold'}>
              Tax:
            </Typography>
            <Box display={'flex'}>
              <Typography variant='caption'>₪{apartmentInfo.tax}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant='body2' fontWeight={'bold'}>
              Total Price:
            </Typography>
            <Box display={'flex'}>
              <Typography variant='caption'>₪{apartmentInfo.totalPrice}</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant='body2' fontWeight={'bolder'}>
              Entrance date:
            </Typography>
            <Typography variant='caption'>
              {new Date(apartmentInfo.entranceDate).toLocaleDateString()}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PaymentCalculator;
