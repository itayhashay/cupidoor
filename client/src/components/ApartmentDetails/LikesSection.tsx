import {
  Avatar,
  Badge,
  Box,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import { User } from '../../types/user';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import { precentToColor } from '../../utils/colors';

const LikesSection = ({
  likes,
  handleApproveClick,
  handleDeclineClick,
}: {
  likes: User[];
  handleApproveClick: (tenantId: string) => void;
  handleDeclineClick: (tenantId: string) => void;
}) => {
  return (
    <Grid item xs={4}>
      <Grid container padding={1}>
        <Grid item xs={12}>
          <Box>
            <Typography variant='h5'>Likes</Typography>
            <Divider></Divider>
          </Box>
        </Grid>
        {likes.length === 0 ? (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}></Box>
        ) : (
          <Grid item xs={12} padding={1}>
            <Grid container rowGap={2} alignItems={'center'}>
              {likes.map((user) => {
                return (
                  <Grid item xs={12} key={user._id}>
                    <Grid container>
                      <Grid item xs={2}>
                        <Badge
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: precentToColor(user.match),
                              color: 'white',
                              boxShadow: `0px 0px 5px 1px #4f4d4d`,
                              '&::after': {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                animation: 'ripple 1.2s infinite ease-in-out',
                                border: '1px solid ' + precentToColor(user.match),
                                content: '""',
                              },
                            },
                            '@keyframes ripple': {
                              '0%': {
                                transform: 'scale(.8)',
                                opacity: 1,
                              },
                              '100%': {
                                transform: 'scale(2.4)',
                                opacity: 0,
                              },
                            },
                          }}
                          badgeContent={user.match + '%'}
                        >
                          <Avatar src={user.avatar}></Avatar>
                        </Badge>
                      </Grid>
                      <Grid item xs={4}>
                        <Box display={'flex'}>
                          <Typography mr={1} fontWeight={"bold"}>{user.firstName}</Typography>
                          <Typography  fontWeight={"bold"}>{user.lastName}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box display={'flex'} justifyContent={'flex-end'}>
                          <Tooltip title='Accept'>
                            <IconButton
                              color='success'
                              onClick={() => handleApproveClick(user._id as string)}
                            >
                              <CheckOutlined></CheckOutlined>
                            </IconButton>
                          </Tooltip>

                          <Tooltip title='Decline'>
                            <IconButton color='error' onClick={()=>handleDeclineClick(user._id as string)}>
                              <CloseOutlined></CloseOutlined>
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default LikesSection;
