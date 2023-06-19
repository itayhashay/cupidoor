import { type } from 'os';

export type ChatUserType = {
  _id: string;
  name: string;
  avatar: string;
};

export type ChatContactType = {
  _id: string;
  name: string;
  avatar: string;
  conversationId: string;
  lastMessage: string;
  notifications?: number;
  receiver: ChatReceiverType;
  tag?: {
    _id: string;
    title: string;
  };
};

export type ChatMyApartmentsType = {
  _id: string;
  name: string;
  avatar: string;
  matches: ChatContactType[];
};

export type ChatContactProps = {
  contact: ChatContactType;
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
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
};

export type ConversationType = {
  _id: string;
  members: string[];
};

export type ChatConversationAxiosResponse = {
  conversationId: string;
  receiver: ChatReceiverType;
  messages: ChatMessageType[];
  apartmentName:string;
};

export type ChatConversationProps = {
  userAvatar?: string;
  receiver: ChatReceiverType;
  conversationId: string;
  messages: ChatMessageType[];
  apartmentName:string;
  handleClose: () => void;
  handleSendMessage: (conversationId: string, receiver: string, message: string) => void;
};

export type ChatArrivedMessageType = {
  sender: string;
  text: string;
  conversationId: string;
};
