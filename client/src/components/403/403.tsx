//  where the Not Found in will be

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoWhite from '../../icons/logo-main.svg';
const UnAuthorizedPage = () => {
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      bgcolor={'primary.light'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Container>
        <Stack justifyContent={'center'}>
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={200}>
            <Typography fontSize={'12em'} fontWeight={'bold'} color={'white'} textAlign={'center'}>
              401
            </Typography>
            <img src={LogoWhite} alt='logo' style={{ height: '100%' }} />
          </Box>

          <Typography
            marginBottom={3}
            textAlign={'center'}
            flexBasis={'100%'}
            variant='h1'
            fontSize={'3em'}
            fontWeight={'bold'}
            color={'white'}
          >
            You Are Unauthorized!
          </Typography>
          <Button
            component={Link}
            to='/home/all-apartments'
            variant='contained'
            sx={{ width: 200, margin: 'auto', bgcolor: 'secondary.main' }}
          >
            Go Back To Safety
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default UnAuthorizedPage;
