import { useState, useEffect, useRef } from "react";
import {
  Card,
  Paper,
  Grid,
  Typography,
  Box,
  Stack,
  Avatar,
  Slide,
  Collapse,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Chat as ChatIcon } from "@mui/icons-material";
import ChatConversation from "./chatConversation";
import {
  ChatArrivedMessageType,
  ChatConversationAxiosResponse,
  ChatConversationProps,
  ChatUserType,
} from "./types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChatContact from "./chatContact";
import { Socket, io } from "socket.io-client";
import { AxiosResponse } from "axios";

const CupidChat: React.FC = () => {
  const { user } = useAuth();
  const socket = useRef<Socket>();
  const chatContainerRef = useRef(null);
  const [conversationUserId, setConversationUserId] = useState<string | null>(
    null
  );
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversation, setCurrentConversation] =
    useState<ChatConversationAxiosResponse | null>(null);
  const [users, setUsers] = useState<ChatUserType[] | []>([]);
  const [arrivedMessage, setArrivedMessage] =
    useState<ChatArrivedMessageType | null>(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    socket.current = io("http://localhost:2309");
  }, []);

  useEffect(() => {
    socket.current?.on("connect", () => {
      socket.current?.emit("addUser", user?._id);

      socket.current?.on("getMessage", (data) => {
        setArrivedMessage(data);
      });
    });
  }, []);

  useEffect(() => {
    if (
      arrivedMessage &&
      currentConversation?.conversation._id === arrivedMessage.conversationId
    ) {
      setCurrentConversation((prev: any) => {
        if (prev) {
          const messages = prev?.messages;
          messages?.push(arrivedMessage);
          return { ...prev };
        }
        return prev;
      });
    } else {
      setUsers((prevState: any) => {
        const newState = prevState.map((userState: ChatUserType) => {
          if (userState._id === arrivedMessage?.sender) {
            return {
              ...userState,
              lastMessage: arrivedMessage.text,
              notifications:
                userState.notifications !== undefined
                  ? userState.notifications + 1
                  : 1,
            };
          }
          return userState;
        });
        return newState;
      });
    }
  }, [arrivedMessage]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axiosPrivate.get("/chat/conversations");
      const { conversations } = response.data;
      setUsers(conversations);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchConversation = async () => {
      const response: AxiosResponse<ChatConversationAxiosResponse> =
        await axiosPrivate.get(
          `http://localhost:2308/chat/${conversationUserId}`
        );
      const { conversation, receiver, messages } = response.data;
      setCurrentConversation({
        conversation,
        receiver,
        messages,
      });
      setIsLoading(false);
    };
    if (conversationUserId) {
      setIsLoading(true);
      fetchConversation();
    } else if (currentConversation) {
      setCurrentConversation(null);
    }
  }, [conversationUserId]);

  const handleCloseConversation = () => {
    setConversationUserId(null);
  };

  const handleContactClick = (userId: string) => {
    setConversationUserId(userId);
    setUsers((prevState: any) => {
      const newState = prevState.map((userState: ChatUserType) => {
        if (userState._id === userId) {
          userState.notifications = 0;
          return userState;
        }
        return userState;
      });

      return newState;
    });
  };

  const handleChatClick = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleSendMessage = async (
    conversationId: string,
    receiver: string,
    text: string
  ) => {
    const message = {
      conversationId,
      text,
      sender: user?._id,
      createdAt: Date.now(),
    };

    socket.current?.emit("sendMessage", {
      conversationId,
      senderId: user?._id,
      receiver,
      text,
    });

    try {
      const response = await axiosPrivate.post("/chat/messages", message);
      setCurrentConversation((prev: any) => {
        if (prev) {
          const messages = [...prev?.messages];
          messages?.push(message);
          prev.messages = messages;
          return { ...prev };
        }
        return prev;
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Grid
      container
      component={Paper}
      elevation={3}
      width={300}
      position={"absolute"}
      bottom={0}
      right={"20px"}
      zIndex={9999999999}
      ref={chatContainerRef}
      bgcolor={"white"}
      sx={{ border: "black solid 1px" }}
    >
      <Grid
        item
        xs={12}
        sx={{ cursor: "pointer", bgcolor: "primary.dark" }}
        padding={1}
        onClick={handleChatClick}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          color={"white"}
          alignItems={"center"}
        >
          <ChatIcon sx={{ mr: 2 }}></ChatIcon>
          <Typography fontWeight={"bold"} fontSize={"1.2em"}>
            Chat
          </Typography>
        </Box>
      </Grid>
      <Collapse
        in={isChatOpen}
        mountOnEnter
        unmountOnExit
        sx={{ width: "100%" }}
      >
        <Grid item xs={12} overflow={"auto"} height={"50vh"}>
          <Grid container padding={1} height={"100%"}>
            {!isLoading && !conversationUserId && (
              <Grid item minHeight={200} xs={12} padding={1}>
                {users.length > 0 ? (
                  <Stack gap={1}>
                    {users.map((user) => (
                      <ChatContact
                        key={user._id}
                        id={user._id}
                        name={user.name}
                        avatar={user.avatar}
                        lastMessage={user.lastMessage}
                        notifications={user.notifications}
                        handleContactClick={handleContactClick}
                      ></ChatContact>
                    ))}
                  </Stack>
                ) : (
                  <Box
                    alignItems={"center"}
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Typography textAlign={"center"}>
                      No matches yet.
                    </Typography>
                  </Box>
                )}
              </Grid>
            )}
            {!isLoading && currentConversation && (
              <Grid item xs={12} minHeight={200} height={"100%"}>
                <ChatConversation
                  userAvatar={user?.avatar}
                  conversation={currentConversation.conversation}
                  receiver={currentConversation.receiver}
                  messages={currentConversation.messages}
                  handleClose={handleCloseConversation}
                  handleSendMessage={handleSendMessage}
                ></ChatConversation>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default CupidChat;
