import { useState, FC } from "react";
import { Avatar, Badge, Box, Divider, ListItem, Typography } from "@mui/material";
import { Mail as MailIcon } from "@mui/icons-material";
import "./index.css";
import { ChatContactProps } from "./types";

const ChatContact: React.FC<ChatContactProps> = ({
  contact,
  handleContactClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = (newState: boolean) => {
    setIsHovered(newState);
  };

  return (
    <ListItem>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ cursor: "pointer" }}
        className={isHovered ? "chat-contact-hover" : ""}
        onMouseEnter={() => toggleHover(true)}
        onMouseLeave={() => toggleHover(false)}
        onClick={() => handleContactClick(contact.conversationId)}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Avatar src={contact.avatar} sx={{ mr: 2 }}></Avatar>
          <Box>
            <Typography fontWeight={"bold"}>{contact.name}</Typography>
            <Typography variant="caption" color={"GrayText"}>
              {contact.lastMessage}
            </Typography>
          </Box>
        </Box>
        <Badge badgeContent={contact.notifications} color="primary">
          <MailIcon color="action"></MailIcon>
        </Badge>
      </Box>
      <Divider light></Divider>
    </ListItem>
  );
};

export default ChatContact;
