import { Avatar, Box, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { User } from '../../types/user';
import { CheckOutlined, CloseOutlined } from '@mui/icons-material';
import useAPI from '../../hooks/useAPI';

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
                        <Avatar src={user.avatar}></Avatar>
                      </Grid>
                      <Grid item xs={4}>
                        <Box display={'flex'}>
                          <Typography>{user.firstName}</Typography>
                          <Typography>{user.lastName}</Typography>
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
                            <IconButton color='error'>
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
