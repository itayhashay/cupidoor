import { useState, FC } from "react";
import {
  Avatar,
  Badge,
  Box,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, Mail as MailIcon } from "@mui/icons-material";
import "./index.css";
import { ChatContactProps } from "./types";
import { Stack } from "@mui/system";

const ChatContactList = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <List>
      <ListItemButton onClick={toggleOpen}>
        <ListItemText primary={title} primaryTypographyProps={{fontWeight:"bold"}} ></ListItemText>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} unmountOnExit>
        <Stack gap={1} px={4}>
          {children}
        </Stack>
      </Collapse>
    </List>
  );
};

export default ChatContactList;
