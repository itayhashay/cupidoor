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
    <>
      <Box display={'flex'} alignItems={'center'}>
        <Avatar
          src={avatar}
          sx={{ width: 40, height: 40, mr: 1, visibility: drawAvatar ? 'visible' : 'hidden' }}
        ></Avatar>
        <Box
          padding={1}
          bgcolor={isUser ? '#f9f9f9' : '#e5e9fa'}
          borderRadius={'1px 5px 5px 5px'}
          width={'auto'}
        >
          <Typography width={'auto'} fontWeight={'body1'}>
            {text}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatMessage;
