import { useNavigate, useLocation } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

const BackButton = ({ bgcolor, color }: { bgcolor?: string; color?: string }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    //   if (location.pathname.startsWith('/apartment/')) {
    //     navigate('/home/my-properties');
    //     return;
    //   } else
    if (location.key === 'default') {
      navigate('/home/all-apartments');
      return;
    }
    navigate('/home/all-apartments');
  };

  return (
    <IconButton
      onClick={handleClick}
      sx={{
        bgcolor: bgcolor ? bgcolor : 'primary.dark',
        '&.MuiIconButton-root:hover': {
          bgcolor: 'primary.light',
        },
      }}
    >
      <ArrowBackIcon sx={{ color: 'white' }} />
    </IconButton>
  );
};

export default BackButton;
