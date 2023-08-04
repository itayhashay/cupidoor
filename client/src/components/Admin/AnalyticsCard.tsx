import { Box, Grid, Typography, Stack, Paper, Avatar, Skeleton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AdminPieChart from './PieChart';

const AnalyticsCard = ({
  title,
  icon,
  data,
  index,
}: {
  title: string;
  icon: JSX.Element;
  data: any[];
  index: number;
}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={5} xl={4} height={450} id={title}>
      {data.length > 0 ? (
        <Box borderRadius={10} component={Paper} padding={2} height={'100%'}>
          <Stack justifyContent={'center'} textAlign={'center'}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              padding={2}
            >
              <Typography variant='h5' fontWeight={'bold'} color={'black'}>
                {title}
              </Typography>
              <Avatar sx={{ color: 'white', bgcolor: 'primary.light', width: 50, height: 50 }}>
                {icon}
              </Avatar>
            </Box>

            <AdminPieChart data={data as any[]} index={index} />
          </Stack>
        
        </Box>
      ) : (
        <Skeleton variant='rounded' height={'100%'} sx={{ borderRadius: 10 }}></Skeleton>
      )}
    </Grid>
  );
};

export default AnalyticsCard;
