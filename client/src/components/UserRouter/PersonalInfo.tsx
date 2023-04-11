import { Autocomplete, Button, TextField } from "@mui/material";
import { PersonalInfoContainer, UserForm, FullNameFields, ProfilePicture, ProfilePictureContainer } from "./styles"
import { JOB_TITLES } from "../../utils/jobTitles";
import BirthdayPicker from "./UserForm/BirthdayPicker";
import UserImg from "../../icons/user.jpeg"
import GenderPicker from "./UserForm/GenderPicker";

const PersonalInfo = () => {

    return <PersonalInfoContainer>
        <ProfilePictureContainer>
            <ProfilePicture alt="" src={UserImg}/>
            <Button color="inherit" component="label">
                Change Photo
                <input hidden accept="image/*" multiple type="file" />
            </Button>
        </ProfilePictureContainer>
        <UserForm>
            <FullNameFields>
                <TextField sx={{ margin: '8px 0', width: '48%' }} label="First Name" variant="outlined" />
                <TextField sx={{ margin: '8px 0', width: '48%' }} label="Last Name" variant="outlined" />
            </FullNameFields>
            <TextField sx={{ width: '100%', margin: '8px 0' }} label="Email" variant="outlined" />
            <Autocomplete
                disablePortal
                options={JOB_TITLES}
                sx={{ width: '100%', margin: '8px 0' }}
                renderInput={(params) => <TextField {...params} label="Job Title (Optional)" />}
                />
                <BirthdayPicker />
                <GenderPicker />
                <Button variant="contained">Save Changes</Button>
        </UserForm>
    </PersonalInfoContainer>;
}
 
export default PersonalInfo;