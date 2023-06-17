import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { Apartment } from "../../types/apartment";
import { PropertyFeaturesFilters } from "../../utils/filters";

type ApartmentPropertiesProps = {
  apartmentInfo: Apartment;
  isBasicData?: boolean;
};
const ApartmentFeatures = ({
  apartmentInfo,
  isBasicData = false,
}: ApartmentPropertiesProps) => {
  return (
    <Grid
      container
      borderRadius={3}
      padding={1}
      bgcolor={"#F5F5F5"}
      wrap="wrap"
      sx={{ pointerEvents: "none" }}
    >
      {PropertyFeaturesFilters.map((feature) => {
        return (
          <Grid item xs={12} sm={6} md={4}  key={feature.filterName} >
            <FormControlLabel
              control={
                <Checkbox
                  checked={apartmentInfo[feature.filterName]}
                ></Checkbox>
              }
              label={feature.displayName}
            ></FormControlLabel>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ApartmentFeatures;
