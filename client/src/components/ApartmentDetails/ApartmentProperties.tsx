import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { Apartment } from "../../types/apartment";

type ApartmentPropertiesProps = {
  apartmentInfo: Apartment;
  isBasicData?: boolean;
};
const ApartmentProperties = ({
  apartmentInfo,
  isBasicData = false,
}: ApartmentPropertiesProps) => {
  return (
    <Grid
      container
      borderRadius={3}
      padding={1}
      bgcolor={"#F5F5F5"}
      sx={{ pointerEvents: "none" }}
    >
      <Grid item xs>
        {" "}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.accessible}></Checkbox>}
            label={"Accessible"}
          ></FormControlLabel>

          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.haveBalcony}></Checkbox>}
            label={"Balcony"}
          ></FormControlLabel>
        </FormGroup>
      </Grid>
      <Grid item xs>
        {" "}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.haveBoiler}></Checkbox>}
            label={"Boiler"}
          ></FormControlLabel>

          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.parkings > 0}></Checkbox>}
            label={"Parking"}
          ></FormControlLabel>
        </FormGroup>
      </Grid>
      <Grid item xs>
        {" "}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.furnished}></Checkbox>}
            label={"Furnished"}
          ></FormControlLabel>

          <FormControlLabel
            control={
              <Checkbox checked={apartmentInfo.hasAirConditioning}></Checkbox>
            }
            label={"A/C"}
          ></FormControlLabel>
        </FormGroup>
      </Grid>
      <Grid item xs>
        {" "}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.hasBars}></Checkbox>}
            label={"Bars"}
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.hasElevator}></Checkbox>}
            label={"Elevator"}
          ></FormControlLabel>
        </FormGroup>
      </Grid>
      <Grid item xs>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.hasGarage}></Checkbox>}
            label={"Garage"}
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.isLongTerm}></Checkbox>}
            label={"Long Term"}
          ></FormControlLabel>
        </FormGroup>
      </Grid>
      <Grid item xs>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.isRenovated}></Checkbox>}
            label={"Renovated"}
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox checked={apartmentInfo.hasShelter}></Checkbox>}
            label={"Shelter"}
          ></FormControlLabel>
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default ApartmentProperties;
