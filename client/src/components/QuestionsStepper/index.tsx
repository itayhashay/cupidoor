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
import { Card, Divider } from "@mui/material";
import { USER_ROUTES } from "../UserRouter/constants";
import { useAuth } from "../../context/AuthContext";
import { Question } from "../../types/question";
import { AxiosResponse } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAPI from "../../hooks/useAPI";
import { QuestionAnswer } from "../../types/questionAnswer";
import { useSnackbar } from "../../context/SnackbarContext";
import CupidoorSpinner from "../CupidoorSpinner";

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
  const { user, fetchUser } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([] as Question[]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>(
    [] as QuestionAnswer[]
  );
  const axiosPrivate = useAxiosPrivate();
  const { setUserAnswers, getTenantMatches } = useAPI();
  const { setSnackBarState } = useSnackbar();
  const [isLoading,setIsLoading] = useState(true);
  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const response: AxiosResponse = await axiosPrivate.get("/question");
      const questions: Question[] = response.data;
      setQuestions(questions);
      const answersArray: QuestionAnswer[] = [];
      for (let question of questions) {
        answersArray.push({ questionId: question._id, value: -1, priority: 0 });
      }
      setAnswers(answersArray);
      setIsLoading(false);
    };
    fetchQuestions();
  }, []);

  const setAnswer = (questionId: string, value: number) => {
    setAnswers((prevState) => {
      return prevState.map((answer) => {
        if (answer.questionId === questionId) {
          return { ...answer, value: value };
        }
        return answer;
      });
    });
  };

  const setPriority = (questionId: string, value: number) => {
    setAnswers((prevState) => {
      return prevState.map((answer) => {
        if (answer.questionId === questionId) {
          return { ...answer, priority: value };
        }
        return answer;
      });
    });
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
    setIsLoading(true);
    const submitResponse: AxiosResponse = await setUserAnswers(answers);
    if (submitResponse.status === 201) {
      await fetchUser();
      const res = await getTenantMatches(answers);

      // TODO: Convert to Apartment type and show the screen.
      // If all Selected -> move to home page
      console.log(res);
      displayHouses(res);
    } else {
      setSnackBarState({
        message: "Couldn't submit answers, please try again!",
        severity: "error",
        show: true,
      });
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isLastStep = activeStep === QUESTIONS.length - 1;
  if (user?.answeredQuestions) {
    return <Navigate to={"/home/all-apartments"}></Navigate>;
  } else {
    return isLoading ? <CupidoorSpinner></CupidoorSpinner> : (
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
                content={user?.role === "tenant" ? questions[activeStep].tenant : questions[activeStep].landlord }
                setAnswer={setAnswer}
                value={answers[activeStep].value}
              />
              <PriorityForm
                content=""
                questionId={questions[activeStep]._id}
                setAnswer={setPriority}
                value={answers[activeStep].priority}
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
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleSubmit}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {"Find My Home!"}
                  </Button>
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
