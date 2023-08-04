import { Box, Grid, Typography, Stack, Paper, Avatar } from '@mui/material';
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
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      lg={5}
      xl={3}
      height={450}
      borderRadius={10}
      id={title}
      component={Paper}
      padding={2}
      bgcolor={'secondary.light'}
    >
      <Stack justifyContent={'center'} textAlign={'center'}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} padding={2}>
          <Typography variant='h5' fontWeight={'bold'} color={'black'}>
            {title}
          </Typography>
          <Avatar sx={{ color: 'primary.dark', bgcolor: 'secondary.main' }}>{icon}</Avatar>
        </Box>

        <AdminPieChart data={data as any[]} index={index} />
      </Stack>
    </Grid>
  );
};

export default AnalyticsCard;
