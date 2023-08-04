import { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import {
  UsersAnalyticsType,
  ApartmentsAnalyticsType,
  MatchesAnalyticsType,
  ChatsAnalyticsType,
} from '../../types/AdminAnalytics';
import {
  Box,
  Grid,
  Typography,
  Stack,
  Paper,
  Avatar,
  Skeleton,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import AdminPieChart from './PieChart';
import AnalyticsCard from './AnalyticsCard';
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import HouseIcon from '@mui/icons-material/HouseOutlined';
import FavoriteIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoneyOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ChatIcon from '@mui/icons-material/ChatOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CupidoorSpinner from '../CupidoorSpinner';

const AdminAnalytics = () => {
  const [usersAnalytics, setUsersAnalytics] = useState<UsersAnalyticsType | null>(null);
  const [apartmentsAnalytics, setApartmentsAnalytics] = useState<ApartmentsAnalyticsType | null>(
    null,
  );
  const [matchesAnalytics, setMatchesAnalytics] = useState<MatchesAnalyticsType | null>(null);
  const [chatsAnalytics, setChatsAnalytics] = useState<ChatsAnalyticsType | null>(null);

  const { getUsersAnalytics, getApartmentsAnalytics, getMatchesAnalytics, getChatsAnalytics } =
    useAPI();
  useEffect(() => {
    const fetchAnalytics = async () => {
      getUsersAnalytics().then((data) => {
        const analytics: UsersAnalyticsType = data.usersAnalytics;
        setUsersAnalytics(analytics);
      });

      getApartmentsAnalytics().then((data) => {
        const analytics: ApartmentsAnalyticsType = data.apartmentsAnalytics;
        setApartmentsAnalytics(analytics);
      });

      getMatchesAnalytics().then((data) => {
        const analytics: MatchesAnalyticsType = data.matchesAnalytics;
        setMatchesAnalytics(analytics);
      });

      getChatsAnalytics().then((data) => {
        const analytics: ChatsAnalyticsType = data.chatsAnalytics;
        setChatsAnalytics(analytics);
      });
    };
    fetchAnalytics();
  }, []);

  const getUserPieChartData = () => {
    return !usersAnalytics
      ? []
      : [
          { name: 'Total', value: usersAnalytics.total },
          { name: 'New this month', value: usersAnalytics.month },
        ];
  };
  const getUserRolePieChartData = () => {
    let arr = [];
    if (usersAnalytics) {
      for (let role of usersAnalytics.roles) {
        let name: string = role._id.slice(1);
        name = role._id[0].toUpperCase() + name;
        arr.push({ name, value: role.count });
      }
    }

    return arr;
  };

  const getApartmentPieChartData = () => {
    return !apartmentsAnalytics
      ? []
      : [
          { name: 'Total', value: apartmentsAnalytics.total },
          { name: 'New this month', value: apartmentsAnalytics.month },
        ];
  };

  const getApartmentPricePieChartData = () => {
    return !apartmentsAnalytics
      ? []
      : [
          { name: 'Min price', value: apartmentsAnalytics.min },
          { name: 'Max price', value: apartmentsAnalytics.max },
          { name: 'Average price', value: Math.round(apartmentsAnalytics.avg) },
        ];
  };

  const getMatchPieChartData = () => {
    return !matchesAnalytics
      ? []
      : [
          { name: 'Total', value: matchesAnalytics.total },
          { name: 'New this month', value: matchesAnalytics.month },
        ];
  };

  const getChatPieChartData = () => {
    return !chatsAnalytics
      ? []
      : [
          { name: 'Active chats', value: chatsAnalytics.total },
          { name: 'Total messages', value: chatsAnalytics.messages },
        ];
  };

  return (
    <>
      <Grid container spacing={3} width={'100%'} m={0}>
        <AnalyticsCard
          title={'Total Users'}
          data={getUserPieChartData()}
          icon={<PersonIcon sx={{ fontSize: '2rem' }} />}
          index={0}
        />

        <AnalyticsCard
          title={'Users Types'}
          data={getUserRolePieChartData()}
          icon={<SupervisorAccountIcon sx={{ fontSize: '2rem' }} />}
          index={1}
        />
        <AnalyticsCard
          title={'Chat Analytics'}
          data={getChatPieChartData()}
          icon={<ChatIcon sx={{ fontSize: '2rem' }} />}
          index={2}
        />

        <AnalyticsCard
          title={'Total Apartments'}
          data={getApartmentPieChartData()}
          icon={<HouseIcon sx={{ fontSize: '2rem' }} />}
          index={3}
        />

        <AnalyticsCard
          title={'Apartments Prices'}
          data={getApartmentPricePieChartData()}
          icon={<AttachMoneyIcon sx={{ fontSize: '2rem' }} />}
          index={4}
        />

        <AnalyticsCard
          title={'Total Matches'}
          data={getMatchPieChartData()}
          icon={<FavoriteIcon sx={{ fontSize: '2rem' }} />}
          index={5}
        />
        <Grid item xs={12} sm={12} md={6} lg={5} xl={4} height={450}>
          {usersAnalytics && usersAnalytics.avatars.length > 0 ? (
            <Box borderRadius={10} component={Paper} padding={2} height={'100%'}>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                padding={2}
              >
                <Typography variant='h5' fontWeight={'bold'} color={'black'}>
                  New Users Highlight
                </Typography>
                <Avatar sx={{ color: 'white', bgcolor: 'primary.light', width: 50, height: 50 }}>
                  <PersonAddOutlinedIcon></PersonAddOutlinedIcon>
                </Avatar>
              </Box>
              <Box px={2}>
                <Typography variant='subtitle1' fontWeight={'bold'} color={'GrayText'}>
                  Meet this month new customers:
                </Typography>
              </Box>
              <Box display={'flex'} justifyContent={'center'} alignItems={"center"} height={200}>
                <AvatarGroup total={usersAnalytics.avatars.length * 2}>
                  {usersAnalytics.avatars.map((avatar: any) => (
                    <Tooltip
                      title={`${avatar.firstName} ${avatar.lastName}`}
                      key={avatar.firstName}
                    >
                      <Avatar src={avatar.avatar} sx={{ height: 56, width: 56 }} />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </Box>
            </Box>
          ) : (
            <Skeleton variant='rounded' height={'100%'} sx={{ borderRadius: 10 }}></Skeleton>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminAnalytics;
