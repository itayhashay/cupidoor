import { useState, FC } from "react";
import { Avatar, Badge, Box, Divider, Typography } from "@mui/material";
import { Mail as MailIcon } from "@mui/icons-material";
import "./index.css";
import { ChatContactProps } from "./types";

const ChatContact: React.FC<ChatContactProps> = ({
  id,
  avatar,
  name,
  lastMessage,
  notifications,
  handleContactClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = (newState: boolean) => {
    setIsHovered(newState);
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ cursor: "pointer" }}
        className={isHovered ? "chat-contact-hover" : ""}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        onClick={() => handleContactClick(id)}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Avatar src={avatar} sx={{ mr: 2 }}></Avatar>
          <Box>
            <Typography fontWeight={"bold"}>{name}</Typography>
            <Typography variant="caption" color={"GrayText"}>
              {lastMessage}
            </Typography>
          </Box>
        </Box>
        <Badge badgeContent={notifications} color="secondary">
          <MailIcon color="action"></MailIcon>
        </Badge>
      </Box>
      <Divider light></Divider>
    </>
  );
};

export default ChatContact;
