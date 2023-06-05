const conversationModel = require("../model/conversation.model");
const UserService = require("../service/user.service");
const UsersRelationsModel = require("../model/usersRelations.model");
const MessageModel = require("../model/message.model");
const UserModel = require("../model/user.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ChatService = {
  getConversations: async function (fromUser) {
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

      const users = await UserModel.find({
        _id: {
          $in: [...usersIds],
        },
      });

      const response = [];

      for (let user of users) {
        let conversation = await conversationModel.findOne({
          members: {
            $all: [user._id.toString(), fromUser],
          },
        });
        if (!conversation) {
          conversation = await this.createConversation(
            fromUser,
            user._id.toString()
          );
        }

        const messages = await MessageModel.find({
          conversationId: conversation._id,
        }).sort({ createdAt: -1 });
        const lastMessage = messages[0] ? messages[0] : "";
        const notifications = await MessageModel.countDocuments({
          conversationId: conversation._id,
          sender: { $ne: fromUser },
          status: "sent",
        });

        response.push({
          ...user.toJSON(),
          lastMessage,
          notifications,
        });
      }

      return response;
    } catch (ex) {
      throw ex;
    }
  },
  getMatches: async function (fromUser) {
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
  sendMessage: async function (conversationId, sender, text) {
    const message = await MessageModel.create({
      conversationId,
      sender,
      text,
    });
    return message;
  },
  createConversation: async function (fromUser, toUser) {
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
  getConversation: async function (fromUser, toUser) {
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
