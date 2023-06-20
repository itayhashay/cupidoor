import { Avatar, AvatarGroup, Box, Tooltip } from '@mui/material';
import { User } from '../../types/user';
import { DividerLine } from '../HouseCard/styles';
// import { PROFILE_PICTURES, USER_NAMES } from "../../utils/mock";
import { randomNumber } from '../../utils/random';

type LikedUsersProps = { users: User[] };

const LikedUsers = ({ users }: LikedUsersProps) => {
  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        sx={{ maxHeight: '127px', overflowY: 'auto', padding: '10px' }}
      >
        <AvatarGroup max={4}>
          {users.map((user) => {
            return (
              <Tooltip title={`${user.firstName} ${user.lastName}`} key={user._id}>
                <Avatar alt='' src={user.avatar} />
              </Tooltip>
            );
          })}
        </AvatarGroup>
      </Box>
      {/* <DividerLine />
        <Box display="flex" flexDirection="column" alignItems="center" sx={{maxHeight:"127px", overflowY:"auto", 
    padding: "10px"}}>
        <AvatarGroup max={4}>
            {USER_NAMES.map((user) => {
                return (
                    <Avatar alt="" src={PROFILE_PICTURES[randomNumber(0, 20)]}/>
                );
            })}
        </AvatarGroup>
            
        </Box> */}
    </>
  );
};

export default LikedUsers;
