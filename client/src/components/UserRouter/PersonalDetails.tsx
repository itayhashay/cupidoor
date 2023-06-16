import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ProfilePersonalDetailsTitleContainer,
  ProfilePersonalDetailsTitleLabel,
  ProfilePersonalDetailsValue,
  ProfileSectionTitle,
} from "./styles";
import { User } from "../../types/user";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useCallback, useMemo, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { AxiosError } from "axios";
import { CupidAxiosError } from "../../types/cupidAxiosError";
import WorkIcon from '@mui/icons-material/Work';
export type AccountField = {
  name: string;
  path: string;
  icon: JSX.Element;
  type?: string;
  options?: { title: string; value: string }[];
};

const FieldComponent = ({
  disabled,
  field,
  value,
  isReadOnly,
  handleFieldChange,
}: {
  disabled: boolean;
  field: AccountField;
  value: string;
  isReadOnly: boolean;
  handleFieldChange: (path: string, value: string) => void;
}) => {
  return (
    <Grid
      item
      xs={6}
      sx={{ ...ProfilePersonalDetailsTitleContainer }}
      key={field.path}
    >
      <Box display={"flex"} alignItems={"center"} mb={1}>
        {/* {field.icon} */}
        <Typography sx={{ ...ProfilePersonalDetailsTitleLabel }}>
          {field.name}
        </Typography>
      </Box>
      <Box display={"flex"}>
        {(() => {
          if (!field.type) {
            return (
              <TextField
                key={field.path}
                disabled={disabled}
                // sx={{ width: 210 }}
                value={value}
                name={field.name}
                size="small"
                fullWidth
                onChange={(event: any) =>
                  handleFieldChange(field.path, event.target.value)
                }
                inputProps={{ readOnly: !isReadOnly }}
              ></TextField>
            );
          }
          if (field.type === "select") {
            return (
              <Select
                disabled={disabled}
                key={field.path}
                value={value}
                name={field.name}
                inputProps={{ readOnly: !isReadOnly }}
                // sx={{ width: 210 }}
                fullWidth
                size="small"
                onChange={(event: any) =>
                  handleFieldChange(field.path, event.target.value)
                }
              >
                {field.options?.map((option) => {
                  return (
                    <MenuItem value={option.value} key={option.value}>
                      {option.title}
                    </MenuItem>
                  );
                })}
              </Select>
            );
          }
        })()}
      </Box>
    </Grid>
  );
};

const PersonalDetails = ({
  user,
  handleEditMode,
}: {
  user: User;
  handleEditMode: (flag: boolean) => void;
}) => {
  const [isEditMode, _setIsEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [userDetails, setUserDetails] = useState(() => ({ ...user }));
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useAuth();
  const { setSnackBarState } = useSnackbar();
  const accountFields: AccountField[] = useMemo(() => {
    return [
      {
        name: "First Name",
        path: "firstName",
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name: "Last Name",
        path: "lastName",
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name: "Age",
        path: "age",
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name: "Email",
        path: "email",
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name: "Phone",
        path: "phone",
        icon: <BadgeIcon></BadgeIcon>,
      },
      {
        name:"Job Title",
        path:"jobTitle",
        icon:<WorkIcon></WorkIcon>
      },
      {
        name: "Account Type",
        path: "role",
        type: "select",
        options: [
          { title: "Tenant", value: "tenant" },
          { title: "Landlord", value: "landlord" },
          { title: "Both", value: "both" },
        ],
        icon: <BadgeIcon></BadgeIcon>,
      },
    ];
  }, []);

  const setIsEditMode = (flag: boolean) => {
    _setIsEditMode(flag);
    handleEditMode(flag);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    try {
      await updateUser(userDetails);
      setSnackBarState({
        message: "Updated Successfully!",
        severity: "success",
        show: true,
      });
      setIsEditMode(false);
    } catch (ex: any) {
      const error: AxiosError = ex;
      const errorData: CupidAxiosError = error.response
        ?.data as CupidAxiosError;
      const message = errorData
        ? errorData.error
        : "Couldn't update your details!";
      setSnackBarState({
        message: message,
        severity: "error",
        show: true,
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setUserDetails((prevState) => {
      return { ...prevState, [fieldName]: value };
    });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
    setUserDetails(user);
  };

  return (
    <Grid item xs={12}>
      <Box mb={3}>
        <div style={{ position: "relative", width: "100%" }}>
          {!isEditMode && (
            <div style={{ float: "right", position: "relative", top: -10 }}>
              <Tooltip title="Edit">
                <IconButton
                  size="large"
                  color={"primary"}
                  onClick={handleEditClick}
                >
                  <EditNoteIcon sx={{ fontSize: "1.3em" }}></EditNoteIcon>
                </IconButton>
              </Tooltip>
            </div>
          )}
          <Typography sx={{ ...ProfileSectionTitle }}>About me</Typography>
          {isEditMode ? (
            <TextField
              multiline
              rows={5}
              value={userDetails.description}
              onChange={(event: any) =>
                handleFieldChange("description", event.target.value)
              }
              fullWidth
            ></TextField>
          ) : (
            <Typography whiteSpace={"pre-line"}>
              {userDetails.description}
            </Typography>
          )}
        </div>
      </Box>
      <Divider></Divider>
      <Box my={3}>
        <Typography sx={{ ...ProfileSectionTitle }}>
          Personal details
        </Typography>
        <Grid container width={"96%"} rowGap={2} columnSpacing={8}>
          {accountFields.map((field) => {
            return (
              <FieldComponent
                disabled={isLoading}
                field={field}
                value={userDetails[field.path]}
                isReadOnly={isEditMode}
                handleFieldChange={handleFieldChange}
                key={field.path}
              ></FieldComponent>
            );
          })}

          {isEditMode && (
              <Grid item xs={12} my={3}>
                <Box display={"flex"} justifyContent={"space-between"}>
                <Button
                  disabled={isLoading}
                  sx={{ mr: 2 }}
                  variant="contained"
                  onClick={handleCancelClick}
                  color="secondary"
                  startIcon={<CloseIcon></CloseIcon>}
                  fullWidth
                >
                  Cancel
                </Button>

                <Button
                  disabled={isLoading}
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={14}></CircularProgress>
                    ) : (
                      <CheckIcon></CheckIcon>
                    )
                  }
                  variant="contained"
                  onClick={handleSaveClick}
                  fullWidth
                >
                  Save
                </Button>
                </Box>
            
              </Grid>
          
        
          )}
        </Grid>
      </Box>
      <Divider></Divider>
    </Grid>
  );
};

export default PersonalDetails;
