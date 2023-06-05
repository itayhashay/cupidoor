import { type } from "os";

export type ChatUserType = {
  _id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  notifications?: number;
};

export type ChatContactProps = {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  notifications?: number;
  handleContactClick: (userId: string) => void;
};

export type ChatMessageProps = {
  avatar?: string;
  text?: string;
  time?: string;
  drawAvatar?: boolean;
  isUser?: boolean;
};

export type ChatMessageType = {
  text: string;
  sender: string;
  createdAt: string;
};

export type ChatReceiverType = {
  _id: string;
  name: string;
  avatar: string;
};

export type ConversationType = {
  _id: string;
  members: string[];
};

export type ChatConversationAxiosResponse = {
  conversation: ConversationType;
  receiver: ChatReceiverType;
  messages: ChatMessageType[];
};

export type ChatConversationProps = {
  userAvatar?: string;
  receiver: ChatReceiverType;
  conversation: ConversationType;
  messages: ChatMessageType[];
  handleClose: () => void;
  handleSendMessage: (
    conversationId: string,
    receiver: string,
    message: string
  ) => void;
};

export type ChatArrivedMessageType = {
  sender: string;
  text: string;
  conversationId: string;
};
