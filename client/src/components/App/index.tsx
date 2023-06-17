import Navbar from '../Navbar';
import MainRouter from '../routing/MainRouter';
import CupidChat from '../Chat';
import { useAuth } from '../../context/AuthContext';
import { Box, CssBaseline } from '@mui/material';

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box height={"calc(100vh - 64px)"} overflow={"auto"}>
      <MainRouter />
      {user && <CupidChat></CupidChat>}
      </Box>
      
    </>
  );
};

export default App;
