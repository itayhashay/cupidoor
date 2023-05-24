import { Autocomplete, Button, TextField, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  PersonalInfoContainer,
  UserForm,
  FullNameFields,
  ProfilePicture,
  ProfilePictureContainer,
} from "./styles";
import { JOB_TITLES } from "../../utils/jobTitles";
import BirthdayPicker from "./UserForm/BirthdayPicker";
import UserImg from "../../icons/user.jpeg";
import { useState } from "react";

const PersonalInfo = () => {
  const [role, setRole] = useState("Tenant");

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  return (
    <PersonalInfoContainer>
      <ProfilePictureContainer>
        <ProfilePicture alt="" src={UserImg} />
        <Button color="inherit" component="label">
          Change Photo
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </ProfilePictureContainer>
      <UserForm>
        <FullNameFields>
          <TextField
            sx={{ margin: "8px 0", width: "48%" }}
            label="First Name"
            variant="outlined"
          />
          <TextField
            sx={{ margin: "8px 0", width: "48%" }}
            label="Last Name"
            variant="outlined"
          />
        </FullNameFields>
        <TextField
          sx={{ width: "100%", margin: "8px 0" }}
          label="Email"
          variant="outlined"
        />
        <TextField sx={{ margin: "8px 0" }} label="Age" variant="outlined" />
        <TextField sx={{ margin: "8px 0" }} label="Phone" variant="outlined" />
        <Select
          labelId="personal-role"
          id="personal-role"
          value={role}
          label="Role"
          onChange={handleRoleChange}
          placeholder={role}
        >
          <MenuItem value={"Tenant"}>Tenant</MenuItem>
          <MenuItem value={"Landlord"}>Landlord</MenuItem>
          <MenuItem value={"Both"}>Both</MenuItem>
        </Select>
        <Autocomplete
          disablePortal
          options={JOB_TITLES}
          sx={{ width: "100%", margin: "8px 0" }}
          renderInput={(params) => (
            <TextField {...params} label="Job Title (Optional)" />
          )}
        />
        <BirthdayPicker />
        <Button variant="contained">Save Changes</Button>
      </UserForm>
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;
