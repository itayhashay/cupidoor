import { Box, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { ProfileSectionTitle } from "./styles";
import { ServerQuestionAnswer } from "../../types/questionAnswer";
import { Question } from "../../types/question";
import { User } from "../../types/user";

const PersonalInfoAnswers = ({
  user,
  answers,
}: {
  user: User;
  answers: ServerQuestionAnswer[];
}) => {
  const renderQuestionLine = (
    role: string,
    question: Question,
    answer: number,
    index: number
  ) => {
    return (
      <Box display="flex" flexDirection="column" key={question._id} mb={2}>
        <Typography
          width="100%"
          color="#757575"
          fontWeight={700}
          fontSize="16px"
        >
          {role === "tenant" ? question.tenant : question.landlord}
        </Typography>
        <Typography
          color="black"
          fontWeight={"bold"}
          fontSize="16px"
          marginTop="5px"
        >
          {answer == 1 ? "Yes" : "No"}
        </Typography>
        <Divider></Divider>
      </Box>
    );
  };
  return (
    <Grid item xs={12}>
      <Box padding={2}>
        <Typography sx={{ ...ProfileSectionTitle }}>My answers</Typography>
        {answers.length > 0 ? (
          <Box display="flex" flexDirection="column">
            {answers.map((answer: ServerQuestionAnswer, index: number) =>
              renderQuestionLine(
                user.role,
                answer.question,
                answer.answer,
                index
              )
            )}
          </Box>
        ) : (
          <Skeleton height={440}></Skeleton>
        )}
      </Box>
      <Divider></Divider>
    </Grid>
  );
};

export default PersonalInfoAnswers;
