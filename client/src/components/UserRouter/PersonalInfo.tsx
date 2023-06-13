import { Button, Typography, Box, CircularProgress } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  PersonalInfoContainer,
  ProfilePicture,
  ProfilePictureContainer,
  Frame,
  Col,
  LinksDividerLine,
  LinkIcon,
} from "./styles";
import { useState } from "react";
import { User, UserLink } from "../../types/user";
import { PROFILE_PICTURES } from "../../utils/mock";
import { randomNumber } from "../../utils/random";
import { DividerLine } from "../Navbar/styles";
import { LINK_TO_ICON, USER_INFO_FIELDS, UserField } from "../../utils/user";
import ProfileStepper from "./ProfileStepper";
import { QUESTIONS } from "../QuestionsStepper/constant";
import { convertFileToBase64 } from "../../utils/base64";
import axiosPrivate from "../../utils/axiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSnackbar } from "../../context/SnackbarContext";

const PersonalInfo = ({ user }: { user: User }) => {
  const [role, setRole] = useState("Tenant");
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const refresh = useRefreshToken();
  const { snackBarState, setSnackBarState } = useSnackbar();
  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  const uploadProfilePicture = async (event: React.SyntheticEvent) => {
    setIsUploadingPicture(true);
    const base64 = await convertFileToBase64((event.target as any).files[0]);
    try {
      const response = await axiosPrivate.put(`/user/${user._id}`, {
        ...user,
        avatar: base64,
      });
      await refresh();
      setIsUploadingPicture(false);
    } catch (ex) {
      setSnackBarState({
        severity: "error",
        message: "Couldn't update profile picture!",
        show: true,
      });
    }
  };

  const renderInfoLine = (fieldName: string, value: string, index: number) => {
    return (
      <>
        <Box display="flex" flexDirection="row">
          <Typography
            width="30%"
            color="#757575"
            fontWeight={700}
            fontSize="16px"
          >
            {fieldName}
          </Typography>
          <Typography
            width="70%"
            color="#757575"
            fontWeight={400}
            fontSize="16px"
          >
            {value}
          </Typography>
        </Box>
        {index + 1 !== USER_INFO_FIELDS.length && <DividerLine />}
      </>
    );
  };

  const renderQuestionLine = (
    question: string,
    answer: string,
    index: number
  ) => {
    return (
      <>
        <Box display="flex" flexDirection="column">
          <Typography
            width="100%"
            color="#757575"
            fontWeight={700}
            fontSize="16px"
          >
            {question}
          </Typography>
          <Typography
            color="#757575"
            fontWeight={400}
            fontSize="16px"
            marginTop="5px"
          >
            {answer}
          </Typography>
        </Box>
        {index + 1 !== USER_INFO_FIELDS.length && <DividerLine />}
      </>
    );
  };

  const renderLinkLine = (userLink: UserLink, index: number) => {
    return (
      <>
        <Box
          sx={{
            "&:hover": {
              cursor: "pointer",
              background: "#efefef",
            },
          }}
          onClick={() => openLink(userLink.link)}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          padding="1rem"
          width="auto"
        >
          <LinkIcon src={LINK_TO_ICON[userLink.name]} />
          <Typography>{userLink.value}</Typography>
        </Box>
        {index + 1 !== user.linkes?.length && <LinksDividerLine />}
      </>
    );
  };

  return (
    <PersonalInfoContainer>
      <Col>
        <Frame>
          <ProfilePictureContainer>
            <ProfilePicture alt="" src={user?.avatar} />
            <Typography
              variant="h5"
              width="100%"
              color="#4f4f4f"
              textAlign="center"
            >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography
              variant="body1"
              width="100%"
              color="#757575"
              textAlign="center"
              fontWeight={400}
              margin="5px 0"
            >
              {user.jobTitle}
            </Typography>
            <LinksDividerLine />
            <Typography
              variant="body1"
              width="100%"
              color="#757575"
              textAlign="center"
              fontSize="14px"
              fontWeight={500}
              margin="10px 0"
            >
              {user.familiarity}
            </Typography>
            <Box display="flex" justifyContent="center" marginTop="15px">
              <Button color="primary" variant="outlined" component="label">
                {isUploadingPicture ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "Edit Profile Picture"
                )}
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={uploadProfilePicture}
                />
              </Button>
            </Box>
          </ProfilePictureContainer>
        </Frame>
        <Frame>
          {user.linkes?.map((link: UserLink, index: number) =>
            renderLinkLine(link, index)
          )}
        </Frame>
      </Col>
      <Col>
        <Frame>
          <Box
            display="flex"
            flexDirection="column"
            width="70vh"
            padding="0 35px"
            margin="25px 0"
          >
            <Typography variant="h6" fontWeight={300}>
              Complete Your Profile
            </Typography>
            <ProfileStepper user={user} />
          </Box>
        </Frame>
        <Frame>
          <Box
            display="flex"
            flexDirection="column"
            width="70vh"
            padding="0 35px"
            margin="25px 0"
          >
            {USER_INFO_FIELDS.map((field: UserField, index: number) =>
              renderInfoLine(field.fieldName, user[field.fieldValue], index)
            )}
          </Box>
        </Frame>
        <Frame>
          <Box
            display="flex"
            flexDirection="column"
            width="70vh"
            padding="0 35px"
            margin="25px 0"
          >
            {QUESTIONS.map((question: string, index: number) =>
              renderQuestionLine(question, "Yes", index)
            )}
          </Box>
        </Frame>
      </Col>
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;
