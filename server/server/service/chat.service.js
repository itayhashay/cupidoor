const conversationModel = require("../model/conversation.model");
const UserService = require("../service/user.service");
const UsersRelationsModel = require("../model/usersRelations.model");
const MessageModel = require("../model/message.model");
const UserModel = require("../model/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ChatService = {
  getConversations: async (fromUser) => {
    try {
      fromUser = fromUser.toString();

      const matches = await UsersRelationsModel.find({
        relation: "match",
        status: "approved",
        members: {
          $all: [fromUser],
        },
      }).exec();

      const usersIds = matches.map((match) => {
        return match.members.filter((userId) => userId !== fromUser)[0];
      });

      const userPromises = [];
      const conversationsPromises = [];

      for (let user of usersIds) {
        userPromises.push(UserService.getUsersForChat(user));
        conversationsPromises.push(
          conversationModel.findOne({
            members: {
              $all: [user, fromUser],
            },
          })
        );
      }

      const users = await Promise.all(userPromises);
      const conversations = await Promise.all(conversationsPromises);
      const response = [];
      for (let conv of conversations) {
        const messages = await MessageModel.find({
          conversationId: conv._id,
        }).sort({ createdAt: -1 });
        const lastMessage = messages[0];
        const notifications = await MessageModel.countDocuments({
          conversationId: conv._id,
          sender: { $ne: fromUser },
          status: "sent",
        });

        const otherUserId = conv.members.filter(
          (member) => member !== fromUser
        )[0];
        const otherUser = users.filter(
          (user) => user._id.toString() == otherUserId
        )[0];
        response.push({
          ...otherUser.toJSON(),
          lastMessage: lastMessage.text,
          notifications,
        });
      }

      return response;
    } catch (ex) {
      throw ex;
    }
  },
  getMatches: async (fromUser) => {
    try {
      const matches = await UsersRelationsModel.find({
        relation: "match",
        status: "approved",
        members: {
          $all: [fromUser],
        },
      }).exec();
      const usersIds = matches.map((match) => {
        return match.members.filter(
          (userId) => userId !== fromUser.toString()
        )[0];
      });
      const promises = [];
      for (let user of usersIds) {
        promises.push(UserService.getUsersForChat(user));
      }

      const users = await Promise.all(promises);

      return users;
    } catch (ex) {
      throw ex;
    }
  },
  sendMessage: async (conversationId, sender, text) => {
    const message = await MessageModel.create({
      conversationId,
      sender,
      text,
    });
    return message;
  },
  createConversation: async (fromUser, toUser) => {
    try {
      const toUserObject = UserService.getUser(toUser);

      if (!toUserObject) {
        throw new Error("Recipient not found!");
      }
      const newConversation = await conversationModel.create({
        members: [fromUser, toUser],
      });
      return newConversation;
    } catch (ex) {
      throw ex;
    }
  },
  getConversation: async (fromUser, toUser) => {
    const conversation = await conversationModel.findOne({
      members: { $all: [fromUser, toUser] },
    });
    const receiver = await UserService.getUsersForChat(toUser);
    await MessageModel.updateMany(
      { conversationId: conversation._id, sender: new ObjectId(toUser) },
      { status: "read" }
    );
    const messages = await MessageModel.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: 1 })
      .exec();
    return {
      conversation,
      receiver,
      messages,
    };
  },
};

module.exports = ChatService;
