import {
  Typography,
  Box,
  Grid,
  Avatar,
  Paper,
  Tabs,
  Tab,
  Drawer,
  Tooltip,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  ProfilePicture,
  ProfilePictureContainer,
  LinksDividerLine,
  LinkIcon,
} from "./styles";
import { useState, useEffect } from "react";
import { User, UserLink } from "../../types/user";
import { DividerLine } from "../Navbar/styles";
import { LINK_TO_ICON, USER_INFO_FIELDS, UserField } from "../../utils/user";
import ProfileStepper from "./ProfileStepper";
import { convertFileToBase64 } from "../../utils/base64";
import axiosPrivate from "../../utils/axiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useSnackbar } from "../../context/SnackbarContext";
import useAPI from "../../hooks/useAPI";
import { ServerQuestionAnswer } from "../../types/questionAnswer";
import SecurityIcon from "@mui/icons-material/Security";
import PersonIcon from "@mui/icons-material/Person";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PersonalDetails from "./PersonalDetails";
import PersonalInfoAnswers from "./PersonalInfoAnswers";
import { useConfirmationModal } from "../../context/ConfirmationModalContext";
import { Edit, Edit as EditIcon, Height } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import CupidoorSpinner from "../CupidoorSpinner";
import PersonalSecurity from "./PersonalSecurity";

const PersonalInfo = ({ user }: { user: User }) => {
  const [role, setRole] = useState("Tenant");
  const [answers, setAnswers] = useState<ServerQuestionAnswer[]>(
    [] as ServerQuestionAnswer[]
  );
  const [currentTab, setCurrentTab] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploadingPicture, setIsUploadingPicture] = useState(false);
  const refresh = useRefreshToken();
  const { setSnackBarState } = useSnackbar();
  const { getUserAnswers } = useAPI();
  const { showConfirmationModal } = useConfirmationModal();
  const { updateUser } = useAuth();
  useEffect(() => {
    const fetchUserAnswers = async () => {
      const answers = await getUserAnswers();
      setAnswers(answers);
    };
    fetchUserAnswers();
  }, []);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleTabChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    if (isEditMode) {
      const response = await showConfirmationModal({
        title: "Are you sure you want to continue?",
        message: "Your changes will be discarded!",
        severity: "error",
        show: true,
      });
      if (response == false) return;
      setIsEditMode(false);
    }
    setCurrentTab(newValue);
  };

  const handleEditMode = (flag: boolean) => {
    setIsEditMode(flag);
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  const uploadProfilePicture = async (event: React.SyntheticEvent) => {
    const target: any = event.target;
    if (!target.files[0]) return;
    setIsUploadingPicture(true);
    const base64 = await convertFileToBase64(target.files[0]);
    try {
      const response = await updateUser({ ...user, avatar: base64 });
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
      <Box key={fieldName}>
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
      </Box>
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
    <Box bgcolor={"#e4e3e8"} padding={3} height={"100%"} overflow={"auto"}>
      <Box sx={{ width: { xs: "80%", xl: "50%" } }} margin={"auto"}>
        <Box
          component={Paper}
          elevation={4}
          display={"flex"}
          width={"100%"}
          position={"relative"}
        >
          {isUploadingPicture && (
        <CupidoorSpinner></CupidoorSpinner>
          )}
          <Drawer
            sx={{
              pt: 1,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Tabs
              orientation="vertical"
              value={currentTab}
              onChange={handleTabChange}
            >
              <Tooltip title="Personal Details" placement="right">
                <Tab icon={<PersonIcon></PersonIcon>}></Tab>
              </Tooltip>
              <Tooltip title="Questions" placement="right">
                <Tab icon={<QuestionAnswerIcon></QuestionAnswerIcon>}></Tab>
              </Tooltip>
              <Tooltip title="Security" placement="right">
                <Tab icon={<SecurityIcon></SecurityIcon>}></Tab>
              </Tooltip>
            </Tabs>
          </Drawer>

          <Grid container spacing={3} px={2} width={"100%"}>
            <Grid item xs={12}>
              <Box
                display={"flex"}
                sx={{ ...ProfilePictureContainer }}
                justifyContent={"center"}
                textAlign={"center"}
              >
                <div style={{ position: "relative", top: "105px" }}>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    position={"relative"}
                  >
                    <Avatar
                      src={user.avatar}
                      sx={{ ...ProfilePicture }}
                      style={{ border: "3px solid white" }}
                    ></Avatar>
                    {!isEditMode && (
                      <IconButton
                        component="label"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          zIndex: 1,
                          right: 15,
                          borderRadius: 9999,
                          minWidth: 30,
                          width: 30,
                          height: 30,
                          padding: 0,
                        }}
                        color="primary"
                      >
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                          <EditIcon></EditIcon>
                        </Avatar>
                        <input
                          id="avatar"
                          name="avatar"
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={uploadProfilePicture}
                        />
                      </IconButton>
                    )}
                  </Box>

                  <div>
                    <Typography
                      variant="body1"
                      fontWeight={"bold"}
                      fontSize={"1.5em"}
                    >
                      {`${user.firstName} ${user.lastName}`}
                    </Typography>
                  </div>
                </div>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              ></Box>
            </Grid>
            <Grid item xs={12}>
              <ProfileStepper user={user} />
            </Grid>
            {(() => {
              if (currentTab === 0)
                return (
                  <PersonalDetails
                    user={user}
                    handleEditMode={handleEditMode}
                  ></PersonalDetails>
                );
              else if (currentTab === 1)
                return (
                  <PersonalInfoAnswers
                    user={user}
                    answers={answers}
                  ></PersonalInfoAnswers>
                );
                else if(currentTab === 2)
                return(<PersonalSecurity user={user} handleEditMode={handleEditMode}></PersonalSecurity>)
            })()}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
