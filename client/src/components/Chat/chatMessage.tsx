import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { ChatMessageProps } from "./types";

const ChatMessage: React.FC<ChatMessageProps> = ({
  avatar,
  text,
  time,
  drawAvatar,
  isUser,
}) => {
  return (
    <Grid container>
      <Grid item xs={2}>
        {drawAvatar && (
          <Avatar src={avatar} sx={{ width: 32, height: 32, mr: 1 }}></Avatar>
        )}
      </Grid>
      <Grid item xs={"auto"}>
        <Box
          padding={1}
          bgcolor={isUser ? "#f9f9f9" : "#e5e9fa"}
          borderRadius={"1px 5px 5px 5px"}
          width={"auto"}
        >
          <Typography width={"auto"} fontWeight={"body1"}>
            {text}
          </Typography>
        </Box>
      </Grid>
      <Divider sx={{ mt: 1 }} light></Divider>
    </Grid>
  );
};

export default ChatMessage;
