import { useState, useEffect, useRef } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Stack,
  Collapse,
  Button,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import {
  Chat as ChatIcon,
  HouseOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import ChatConversation from "./chatConversation";
import {
  ChatArrivedMessageType,
  ChatContactType,
  ChatConversationAxiosResponse,
  ChatConversationProps,
  ChatUserType,
} from "./types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ChatContact from "./chatContact";
import { Socket, io } from "socket.io-client";
import { AxiosResponse } from "axios";
import ChatContactList from "./chatContactList";

const CupidChat: React.FC = () => {
  const { user } = useAuth();
  const socket = useRef<Socket>();
  const chatContainerRef = useRef(null);
  const [conversationUserId, setConversationUserId] = useState<string | null>(
    null
  );
  const [selectedTab, setSelectedTab] = useState(() => {
    return user?.role !== "landlord" ? 0 : 1;
  });
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversation, setCurrentConversation] =
    useState<ChatConversationAxiosResponse | null>(null);
  const [contacts, setContacts] = useState<ChatContactType[] | []>([]);
  const [arrivedMessage, setArrivedMessage] =
    useState<ChatArrivedMessageType | null>(null);
  const [isChatCentered, setIsChatCentered] = useState(false);
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

    socket.current?.on("disconnect", () => {
      socket.current = io("http://localhost:2309");
    });
  }, []);

  useEffect(() => {
    if (
      arrivedMessage &&
      currentConversation?.conversationId === arrivedMessage.conversationId
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
      setContacts((prevState: any) => {
        const newState = prevState.map((contactState: ChatContactType) => {
          if (contactState.conversationId === arrivedMessage?.conversationId) {
            return {
              ...contactState,
              lastMessage: arrivedMessage.text,
              notifications:
                contactState.notifications !== undefined
                  ? contactState.notifications + 1
                  : 1,
            };
          }
          return contactState;
        });
        return newState;
      });
    }
  }, [arrivedMessage]);

  useEffect(() => {
    const fetchContacts = async () => {
      const url =
        selectedTab === 0 ? "/chat/tenant/matches" : "/chat/landlord/matches";
      const response = await axiosPrivate.get(url);
      const { matches } = response.data;
      setContacts(matches);
      setIsLoading(false);
    };
    setIsLoading(true);
    fetchContacts();
  }, [selectedTab]);

  useEffect(() => {
    const fetchConversation = async () => {
      const response: AxiosResponse<ChatConversationAxiosResponse> =
        await axiosPrivate.get(`http://localhost:2308/chat/${conversationId}`);
      const { messages } = response.data;
      const contact = contacts.filter(
        (contact) => contact.conversationId === conversationId
      )[0];
      setCurrentConversation({
        conversationId: conversationId as string,
        receiver: contact.receiver,
        messages,
      });
      setIsLoading(false);
    };
    if (conversationId) {
      setIsLoading(true);
      fetchConversation();
    } else if (currentConversation) {
      setCurrentConversation(null);
    }
  }, [conversationId]);

  const handleCloseConversation = () => {
    setConversationId(null);
  };

  const handleContactClick = (convId: string) => {
    // setConversationUserId(userId);
    setConversationId(convId);
    setContacts((prevState: any) => {
      const newState = prevState.map((contactState: ChatContactType) => {
        if (contactState.conversationId === convId) {
          contactState.notifications = 0;
          return contactState;
        }
        return contactState;
      });

      return newState;
    });
  };

  const handleChatClick = () => {
    setIsChatOpen((prev) => !prev);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
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
    <>
      {!isChatOpen && (
        <Button
          onClick={handleChatClick}
          sx={{
            position: "absolute",
            bottom: 5,
            right: 30,
            borderRadius: 800,
            height: 60,
            width: 60,
            zIndex:999999
          }}
          variant="contained"
        >
          <ChatIcon></ChatIcon>
        </Button>
      )}

      <Grid
        container
        component={Paper}
        elevation={3}
        zIndex={9999999999}
        ref={chatContainerRef}
        bgcolor={"white"}
        className={
          isChatCentered ? "chat-container centered" : "chat-container"
        }
    
      >
        <Collapse
          in={isChatOpen}
          mountOnEnter
          unmountOnExit
          sx={{ width: "100%" }}
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

          {!conversationId && user?.role === "both" && (
            <Grid item xs={12}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab icon={<HouseOutlined></HouseOutlined>}></Tab>
                <Tab icon={<PersonOutlined></PersonOutlined>}></Tab>
              </Tabs>
            </Grid>
          )}

          <Grid item xs={12} overflow={"auto"} height={"50vh"}>
            <Grid container padding={1} height={"100%"}>
              {(() => {
                if (isLoading) {
                  return (
                    <CircularProgress
                      size={70}
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        margin: "auto",
                      }}
                    ></CircularProgress>
                  );
                }
                if (contacts.length <= 0) {
                  return (
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
                  );
                }
                let chatContacts;
                if (selectedTab === 1) {
                  const tags: any = {};
                  contacts.map((contact) => {
                    if (contact.tag) {
                      if (!tags[contact.tag._id]) {
                        tags[contact.tag._id] = {
                          title: contact.tag.title,
                          matches: [],
                        };
                      }
                      tags[contact.tag._id].matches.push(
                        <ChatContact
                          key={contact._id}
                          contact={contact}
                          handleContactClick={handleContactClick}
                        ></ChatContact>
                      );
                    }
                  });
                  chatContacts = Object.keys(tags).map((key) => {
                    return (
                      <ChatContactList title={tags[key].title} key={key}>
                        {tags[key].matches}
                      </ChatContactList>
                    );
                  });
                } else {
                  chatContacts = contacts.map((contact) => (
                    <ChatContact
                      key={contact._id}
                      contact={contact}
                      handleContactClick={handleContactClick}
                    ></ChatContact>
                  ));
                }
                if (!isLoading && !conversationId) {
                  return (
                    <Grid item minHeight={200} xs={12} padding={1}>
                      <Stack gap={1}>{chatContacts}</Stack>
                    </Grid>
                  );
                }
              })()}

              {!isLoading && currentConversation && (
                <Grid item xs={12} minHeight={200} height={"100%"}>
                  <ChatConversation
                    userAvatar={user?.avatar}
                    conversationId={currentConversation.conversationId}
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
    </>
  );
};

export default CupidChat;
