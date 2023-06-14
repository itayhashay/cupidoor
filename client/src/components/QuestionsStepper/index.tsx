import { Link, Navigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import PetsIcon from "@mui/icons-material/Pets";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HandshakeIcon from "@mui/icons-material/Handshake";

import { StepIconProps } from "@mui/material/StepIcon";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import { QUESTIONS } from "./constant";
import {
  ColorlibConnector,
  ColorlibStepIconRoot,
  QuestionFormSection,
} from "./styles";
import { useEffect, useState } from "react";
import AnswerForm from "./AnswerForm";
import PriorityForm from "./PriorityForm";
import { getTenantMatches, setUserAnswers } from "../../utils/api";
import { Card, Divider } from "@mui/material";
import { USER_ROUTES } from "../UserRouter/constants";
import { useAuth } from "../../context/AuthContext";
import { Question } from "../../types/question";
import { AxiosResponse } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SmokingRoomsIcon />,
    2: <PetsIcon />,
    3: <Diversity3Icon />,
    4: <AttachMoneyIcon />,
    5: <HandshakeIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function QuestionsStepper({
  displayHouses,
}: {
  displayHouses: Function;
}) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([] as Question[]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1, -1, -1]);
  const [priority, setPriorities] = useState<number[]>([0, 0, 0, 0, 0]);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    const fetchQuestions = async () => {
      const response: AxiosResponse = await axiosPrivate.get("/question");
      const questions: Question[] = response.data;
      setQuestions(questions);
    };
    fetchQuestions();
  }, []);

  const setAnswer = (index: number, value: number) => {
    const newAnswers = [...answers]; // create a new copy of the array
    newAnswers[index] = value; // update the element at the specified index
    setAnswers(newAnswers); // update the state with the new array
  };

  const setPriority = (index: number, value: number) => {
    const newPriorities = [...priority]; // create a new copy of the array
    newPriorities[index] = value; // update the element at the specified index
    setPriorities(newPriorities); // update the state with the new array
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep === QUESTIONS.length - 1
        ? prevActiveStep
        : prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep === 0 ? prevActiveStep : prevActiveStep - 1;
    });
  };

  const handleSubmit = async () => {
    console.log({
      answers,
      priority,
    });

    const submitResponse = await setUserAnswers({ answers, priority });

    const res = await getTenantMatches({
      answers,
      priority,
    });

    // TODO: Convert to Apartment type and show the screen.
    // If all Selected -> move to home page
    console.log(res);
    displayHouses(res);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isLastStep = activeStep === QUESTIONS.length - 1;
  if (user?.answeredQuestions) {
    return <Navigate to={"/all-apartments"}></Navigate>;
  } else {
    return questions.length == 0 ? null : (
      <Box sx={{ display: "flex", justifyContent: "center" }} mt={4}>
        <Card sx={{ width: "60%", borderRadius: "24px" }}>
          <Stack sx={{ width: "100%" }} spacing={3}>
            <Stepper
              sx={{ marginTop: "24px" }}
              alternativeLabel
              activeStep={activeStep}
              connector={<ColorlibConnector />}
            >
              {questions.map((question, index) => (
                <Step key={index}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                </Step>
              ))}
            </Stepper>
            <Divider />
            <QuestionFormSection>
              <AnswerForm
                questionId={questions[activeStep]._id}
                content={questions[activeStep].tenant}
                setAnswer={setAnswer}
                value={answers[activeStep]}
              />
              <PriorityForm
                content=""
                questionId={questions[activeStep]._id}
                setAnswer={setPriority}
                value={priority[activeStep]}
              />
              <Box
                sx={{
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 2 }}
                >
                  Back
                </Button>
                {isLastStep ? (
                  <Link
                    className="navbar-link"
                    to={`/home/${USER_ROUTES.ALL_APARTMENTS}`}
                  >
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {"Find My Home!"}
                    </Button>{" "}
                  </Link>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {"Next"}
                  </Button>
                )}
              </Box>
            </QuestionFormSection>
          </Stack>
        </Card>
      </Box>
    );
  }
}
