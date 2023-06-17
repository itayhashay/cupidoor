import { Box, Collapse, Divider, Grid, Typography } from '@mui/material';
import { Apartment } from '../../types/apartment';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
const ApartmentDescription = ({ apartmentInfo }: { apartmentInfo: Apartment }) => {
  const [showDetails, setShowDetails] = useState<boolean>(true);

  const handleCollapseToggle = (event: React.SyntheticEvent) => {
    setShowDetails((prevState) => !prevState);
  };
  return (
    <Grid item xs={12} padding={1}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        onClick={handleCollapseToggle}
      >
        <Typography variant='h6'>Details</Typography>
        {showDetails ? <ExpandLess /> : <ExpandMore />}
      </Box>

      <Divider sx={{ my: 1 }}></Divider>
      <Collapse in={showDetails}>
        <Box mb={1}>
          <Typography variant='subtitle1' fontWeight={'bold'} mr={1}>
            Property Condition:
          </Typography>
          <Typography variant='body2'>{apartmentInfo.propertyCondition}</Typography>
        </Box>
        <Box>
          <Typography variant='subtitle1' fontWeight={'bold'} mr={1}>
            Description:
          </Typography>
          <Typography variant='body2'>{apartmentInfo.description}</Typography>
        </Box>
      </Collapse>
    </Grid>
  );
};

export default ApartmentDescription;
