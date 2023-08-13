import { Navigate, useNavigate } from 'react-router-dom';
import { Stack, Stepper, Step, StepLabel } from '@mui/material';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import PetsIcon from '@mui/icons-material/Pets';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { StepIconProps } from '@mui/material/StepIcon';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button/Button';
import { QUESTIONS, QUESTIONS_STATE } from './constant';
import { ColorlibConnector, ColorlibStepIconRoot, QuestionFormSection } from './styles';
import { useEffect, useState } from 'react';
import AnswerForm from './AnswerForm';
import PriorityForm from './PriorityForm';
import { Divider, Paper } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Question } from '../../types/question';
import { AxiosResponse } from 'axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAPI from '../../hooks/useAPI';
import { QuestionAnswer } from '../../types/questionAnswer';
import { useSnackbar } from '../../context/SnackbarContext';
import CupidoorSpinner from '../CupidoorSpinner';

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
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function QuestionsStepper({
  displayHouses,
  state,
  handleSaveQuestions,
  submitFormik,
}: {
  displayHouses: Function;
  state: QUESTIONS_STATE;
  handleSaveQuestions?: (answers: QuestionAnswer[]) => void;
  submitFormik?: VoidFunction;
}) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([] as Question[]);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([] as QuestionAnswer[]);
  const [isValid,setIsValid] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setUserAnswers, getTenantMatches, fetchUser, setApartmentAnswers } = useAPI();
  const { setSnackBarState } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const response: AxiosResponse = await axiosPrivate.get('/question');
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

  useEffect(()=>{
    if(!answers[activeStep] || answers[activeStep].value == -1){
      setIsValid(false);
    }else{
      setIsValid(true);
    }
  },[activeStep,answers])

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
    if(!isValid){
      return;
    }
    setActiveStep((prevActiveStep) => {
      return prevActiveStep === QUESTIONS.length - 1 ? prevActiveStep : prevActiveStep + 1;
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep === 0 ? prevActiveStep : prevActiveStep - 1;
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // TODO: CHANGE TO SET APARTMENT ANSWERS
    if (state === QUESTIONS_STATE.LANDLORD) {
      handleSaveQuestions && handleSaveQuestions(answers);
    }else{
      const submitResponse: AxiosResponse = await setUserAnswers(answers);
      if (submitResponse.status === 201) {
        await fetchUser();
      } else {
        setSnackBarState({
          message: "Couldn't submit answers, please try again!",
          severity: 'error',
          show: true,
        });
      }
      setIsLoading(false);
    }

  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const isLastStep = activeStep === QUESTIONS.length - 1;
  if (user?.answeredQuestions && state === QUESTIONS_STATE.TENANT) {
    return <Navigate to={'/home/all-apartments'}></Navigate>;
  } else {
    return isLoading ? (
      <CupidoorSpinner></CupidoorSpinner>
    ) : (
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'100%'}>
        <Stack
          component={Paper}
          spacing={3}
          elevation={state === QUESTIONS_STATE.LANDLORD ? 0 : 3}
          width={state === QUESTIONS_STATE.LANDLORD ? '100%' : '50%'}
        >
          <Stepper
            sx={{ alignItems: 'center', pt: 3 }}
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
              content={
                user?.role === 'tenant'
                  ? questions[activeStep].tenant
                  : questions[activeStep].landlord
              }
              setAnswer={setAnswer}
              value={answers[activeStep].value}
            />
            <PriorityForm
              content=''
              questionId={questions[activeStep]._id}
              setAnswer={setPriority}
              value={answers[activeStep].priority}
            />
            <Box
              sx={{
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 2 }}>
                Back
              </Button>
              {isLastStep ? (
                <Button
                  variant='contained'
                  type='button'
                  onClick={handleSubmit}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {state === QUESTIONS_STATE.TENANT ? 'Find My Home!' : 'Publish my property!'}
                </Button>
              ) : (
                <Button
                  variant='contained'
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={!isValid}
                >
                  {'Next'}
                </Button>
              )}
            </Box>
          </QuestionFormSection>
        </Stack>
      </Box>
    );
  }
}
