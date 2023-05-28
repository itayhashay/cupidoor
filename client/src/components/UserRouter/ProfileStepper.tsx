import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { useMemo } from "react";
import { LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import { StepIcon, StepIconConnector } from "./styles";
import { PROFILE_STEPS } from "./constants";
import { User } from "../../types/user";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }} width="auto">
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
const ProfileStepper = ({user} : {user: User}) => {
    const done: number = useMemo(() => {
        return PROFILE_STEPS(user).reduce((done: number, step) => {
            const isDone = step.validCheck();
            return isDone ? done + 1 : done;
        }, 0);
    }, [user]);

    return (
    <Box sx={{ display: "flex", justifyContent: "center" }} mt={4}>
        <Stack sx={{ width: "100%" }} spacing={3}>
            <Stepper
                alternativeLabel
                connector={<StepIconConnector />}
            >
                {PROFILE_STEPS(user).map((step, index) => (
                <Step key={index} sx={{display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
    justifyContent: "space-between"}}>
                    <StepIcon src={step.icon}/>
                    <Typography variant="body1" textAlign="center" margin="10px 0" fontSize="14px">{step.name}</Typography>
                    {step.validCheck() ? <Typography color="green">Done</Typography> : <Button variant="contained" size="small">Add</Button>}
                </Step>
                ))}
            </Stepper>
            <Box sx={{ width: '100%' }}>
                <LinearProgressWithLabel value={done * 100 / 4} />
            </Box>
        </Stack>
    </Box>
  );
}

export default ProfileStepper;