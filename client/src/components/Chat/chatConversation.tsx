import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, Send as SendIcon } from "@mui/icons-material";
import ChatMessage from "./chatMessage";
import { ChatConversationProps } from "./types";

const ChatConversation: React.FC<ChatConversationProps> = ({
  userAvatar,
  conversation,
  receiver,
  messages,
  handleClose,
  handleSendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNewMessageChange = (value: string) => {
    setNewMessage(value);
  };

  const handleSendClick = () => {
    if (newMessage.trim() !== "") {
      handleSendMessage(conversation._id, receiver._id, newMessage);
      setNewMessage("");
    }
  };
  return (
    <Stack height={"100%"}>
      <Box display={"flex"} alignItems={"center"} mb={1}>
        <ArrowBack sx={{ cursor: "pointer" }} onClick={handleClose}></ArrowBack>
        <Box display={"flex"} ml={2} alignItems={"center"}>
          <Avatar
            src={receiver.avatar}
            sx={{ width: 32, height: 32, mr: 1 }}
          ></Avatar>
          <Typography fontWeight={"bold"}>{receiver.name}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 1 }} light></Divider>

      {messages && messages.length > 0 ? (
        <Stack gap={1} overflow={"auto"} maxHeight={"80%"}>
          {(() => {
            let lastSender: string;
            return messages?.map((message) => {
              const drawAvatar = lastSender !== message.sender;
              const isUser = message.sender !== receiver._id;
              lastSender = message.sender;
              return (
                <ChatMessage
                  avatar={isUser ? userAvatar : receiver.avatar}
                  text={message.text}
                  drawAvatar={drawAvatar}
                  isUser={isUser}
                  key={message.sender + message.createdAt}
                ></ChatMessage>
              );
            });
          })()}
          <Typography ref={scrollRef} variant="caption">
            You are up to date
          </Typography>
        </Stack>
      ) : (
        <Typography textAlign={"center"} variant={"body2"} color={"GrayText"}>
          No messages yet.
        </Typography>
      )}

      <Box display={"flex"} mt={"auto !important"} alignItems={"center"}>
        <TextField
          fullWidth
          size="small"
          multiline
          id="chat-input"
          label="Enter your message..."
          variant={"outlined"}
          value={newMessage}
          maxRows={8}
          onChange={(e) => handleNewMessageChange(e.target.value)}
        ></TextField>
        <IconButton color="primary" onClick={handleSendClick}>
          <SendIcon></SendIcon>
        </IconButton>
      </Box>
    </Stack>
  );
};

export default ChatConversation;