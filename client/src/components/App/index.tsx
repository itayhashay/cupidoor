import MainRouter from '../routing/MainRouter';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Box sx={{ maxHeight: "100vh", overflowY: "hidden" }}>
      <MainRouter />
    </Box>
  );
};

export default App;
