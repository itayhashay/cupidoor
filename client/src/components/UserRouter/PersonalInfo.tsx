import { Autocomplete, Button, TextField, MenuItem, Typography, Box } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  PersonalInfoContainer,
  UserForm,
  FullNameFields,
  ProfilePicture,
  ProfilePictureContainer,
  Frame,
  Col,
  LinksDividerLine,
  LinkIcon
} from "./styles";
import { JOB_TITLES } from "../../utils/jobTitles";
import BirthdayPicker from "./UserForm/BirthdayPicker";
import UserImg from "../../icons/user.jpeg";
import { useState } from "react";
import { User, UserLink } from "../../types/user";
import { PROFILE_PICTURES } from "../../utils/mock";
import { randomNumber } from "../../utils/random";
import { DividerLine } from "../Navbar/styles";
import { LINK_TO_ICON, USER_INFO_FIELDS, UserField } from "../../utils/user";
import BalconyIcon from "../../icons/links/linkedin.png";
import ProfileStepper from "./ProfileStepper";

const PersonalInfo = ({user} : {user: User}) => {
  const [role, setRole] = useState("Tenant");

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  }

  const renderInfoLine = (fieldName: string, value: string, index: number) => {
    return (          
    <>
      <Box display="flex" flexDirection="row">
        <Typography width="30%" color="#757575" fontWeight={700} fontSize="16px">
          {fieldName}
        </Typography>
        <Typography width="70%" color="#757575" fontWeight={400} fontSize="16px">
          {value}
        </Typography>
      </Box>
      {index + 1 !== USER_INFO_FIELDS.length && <DividerLine />}
    </>)
  }

  const renderLinkLine = (userLink: UserLink, index: number) => {
    return (          
    <>
          <Box sx={{
            "&:hover": {
              cursor: "pointer",
              background: "#efefef"
            }
          }} onClick={() => openLink(userLink.link)} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" padding="1rem" width="auto">
            <LinkIcon src={LINK_TO_ICON[userLink.name]} />
            <Typography>{userLink.value}</Typography>
          </Box>
          {index + 1 !== user.linkes?.length && <LinksDividerLine />}
    </>)
  }

  return (
    <PersonalInfoContainer>
      <Col>
        <Frame>
          <ProfilePictureContainer>
            <ProfilePicture alt="" src={PROFILE_PICTURES[randomNumber(0, 20)]} />
            <Typography variant="h5" width="100%" color="#4f4f4f" textAlign="center" >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography variant="body1" width="100%" color="#757575" textAlign="center" fontWeight={400} margin="10px 0">
              {user.jobTitle}
            </Typography>
            <Button color="primary" variant="outlined" component="label">
              Change Photo
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </ProfilePictureContainer>
        </Frame>
        <Frame>
          {user.linkes?.map((link: UserLink, index: number) => renderLinkLine(link, index))}
        </Frame>
      </Col>
      <Col>
        <Frame>
          <Box display="flex" flexDirection="column" width="70vh" padding="0 35px" margin="25px 0">
            {USER_INFO_FIELDS.map((field: UserField, index: number) => renderInfoLine(field.fieldName, user[field.fieldValue], index))}
          </Box>
        </Frame>
        <Frame>
          <Box display="flex" flexDirection="column" width="70vh" padding="0 35px" margin="25px 0">
            Complete Profile
            <ProfileStepper user={user}/>
          </Box>
        </Frame>
      </Col>
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;
