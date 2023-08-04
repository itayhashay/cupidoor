import { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { AdminAnalyticsType } from '../../types/AdminAnalytics';
import { Box, Grid, Typography, Stack, Paper, Avatar } from '@mui/material';
import AdminPieChart from './PieChart';
import PersonIcon from '@mui/icons-material/Person';
import HouseIcon from '@mui/icons-material/House';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AnalyticsCard from './AnalyticsCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CupidoorSpinner from '../CupidoorSpinner';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ChatIcon from '@mui/icons-material/Chat';
const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<AdminAnalyticsType>({} as AdminAnalyticsType);
  const { getAdminAnalytics } = useAPI();
  useEffect(() => {
    const fetchAnalytics = async () => {
      const data = await getAdminAnalytics();
      setAnalytics(data);
    };
    fetchAnalytics();
  }, []);

  const getUserPieChartData = () => {
    return [
      { name: 'Total', value: analytics.users.total },
      { name: 'New this month', value: analytics.users.month },
    ];
  };
  const getApartmentPieChartData = () => {
    return [
      { name: 'Total', value: analytics.apartments.total },
      { name: 'New this month', value: analytics.apartments.month },
    ];
  };
  const getMatchPieChartData = () => {
    return [
      { name: 'Total', value: analytics.matches.total },
      { name: 'New this month', value: analytics.matches.month },
    ];
  };

  const getApartmentPricePieChartData = () => {
    return [
      { name: 'Min price', value: analytics.apartments.min },
      { name: 'Max price', value: analytics.apartments.max },
      { name: 'Average price', value: Math.round(analytics.apartments.avg) },
    ];
  };
  const getChatPieChartData = () => {
    return [
      { name: 'Active chats', value: analytics.chats.total },
      { name: 'Total messages', value: analytics.chats.messages },
    ];
  };

  const getUserRolePieChartData = () => {
    let arr = [];
    for (let role of analytics.users.roles) {
      let name: string = role._id.slice(1);
      name = role._id[0].toUpperCase() + name;
      arr.push({ name, value: role.count });
    }
    return arr;
  };

  return Object.keys(analytics).length > 0 ? (
    <>
      <Grid container gap={3} display={'flex'}>
        <AnalyticsCard
          title={'Total Users'}
          data={getUserPieChartData()}
          icon={<PersonIcon sx={{ fontSize: '2rem', color: 'black' }} />}
          index={0}
        />

        <AnalyticsCard
          title={'Users Types'}
          data={getUserRolePieChartData()}
          icon={<SupervisorAccountIcon sx={{ fontSize: '2rem', color: 'black' }} />}
          index={1}
        />
        <AnalyticsCard
          title={'Chat Analytics'}
          data={getChatPieChartData()}
          icon={<ChatIcon sx={{ fontSize: '2rem', color: 'black' }} />}
          index={2}
        />

        <AnalyticsCard
          title={'Total Apartments'}
          data={getApartmentPieChartData()}
          icon={<HouseIcon sx={{ fontSize: '2rem', color: 'black' }} />}
          index={3}
        />

        <AnalyticsCard
          title={'Apartments Prices'}
          data={getApartmentPricePieChartData()}
          icon={<AttachMoneyIcon sx={{ fontSize: '2rem', color: 'black' }} />}
          index={4}
        />

        <AnalyticsCard
          title={'Total Matches'}
          data={getMatchPieChartData()}
          icon={<FavoriteIcon sx={{ fontSize: '2rem', color: 'black' }} />}
          index={5}
        />
      </Grid>
    </>
  ) : (
    <CupidoorSpinner></CupidoorSpinner>
  );
};

export default AdminAnalytics;
