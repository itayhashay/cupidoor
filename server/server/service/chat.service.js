const conversationModel = require("../model/conversation.model");
const UserService = require("../service/user.service");
const UsersRelationsModel = require("../model/usersRelations.model");
const MessageModel = require("../model/message.model");
const UserModel = require("../model/user.model");
const ApartmentModel = require("../model/apartment.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ChatService = {
  getTenantMatches: async function (user) {
    let matches = await UsersRelationsModel.find({ tenant: user._id,status:"match" })
      .populate({
        path: "apartment",
        populate: {
          path: "user",
        },
      })
      .exec();

    const response = [];
    for (let match of matches) {
      let conversation = await conversationModel.findOne({
        apartment: match.apartment._id,
      });
      if (!conversation) {
        conversation = await this.createConversation(
          user._id,
          match.apartment._id
        );
      }
      const lastMessage = await MessageModel.findOne({
        conversationId: conversation._id,
      })
        .sort({ createdAt: -1 })
        .limit(1)
        .exec();

      const notifications = await MessageModel.countDocuments({
        conversationId: conversation._id,
        sender: { $ne: user._id },
        status: "sent",
      });

      response.push({
        _id: match.apartment._id,
        name: match.apartment.address,
        avatar: match.apartment.images[0],
        conversationId: conversation._id,
        lastMessage: lastMessage ? lastMessage.text : "",
        notifications,
        receiver: {
          _id: match.apartment.user._id,
          name: match.apartment.user.name,
          avatar: match.apartment.user.avatar,
        },
      });
    }

    return response;
  },
  getLandlordMatches: async function (user) {
    if (user.role === "tenant") return [];

    const matches = await UsersRelationsModel.aggregate([
      {
        $lookup: {
          from: "apartments",
          localField: "apartment",
          foreignField: "_id",
          as: "Apartment",
        },
      },

      { $unwind: "$Apartment" },

      {
        $project: {
          "Apartment._id": 1,
          "Apartment.user": 1,
          tenant: 1,
        },
      },
      {
        $match: {
          "Apartment.user": user._id,
        },
      },
      {
        $group: {
          _id: "$Apartment._id",
          tenant: { $push: "$tenant" },
          Apartment: { $first: "$Apartment" },
        },
      },
    ]).exec();

    const response = [];
    for (let match of matches) {
      const apartmentMatches = [];
      const apartment = await ApartmentModel.findOne({
        _id: match.Apartment._id,
      });
      for (let tenant of match.tenant) {
        const matchUser = await UserModel.findOne({ _id: tenant });
        let conversation = await conversationModel.findOne({
          tenant: matchUser._id,
        });
        if (!conversation) {
          conversation = await this.createConversation(
            matchUser._id,
            match.Apartment._id
          );
        }
        const lastMessage = await MessageModel.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .limit(1)
          .exec();

        const notifications = await MessageModel.countDocuments({
          conversationId: conversation._id,
          sender: { $ne: user._id },
          status: "sent",
        });
        response.push({
          _id: matchUser._id,
          name: matchUser.name,
          avatar: matchUser.avatar,
          conversationId: conversation._id,
          lastMessage: lastMessage ? lastMessage.text : "",
          notifications,
          receiver: {
            _id: matchUser._id,
            name: matchUser.name,
            avatar: matchUser.avatar,
          },
          tag: {
            _id: apartment._id,
            title: apartment.address,
          },
        });
      }
    }
    return response;
  },
  getConversations: async function (user) {
    try {
      const matches = await UsersRelationsModel.aggregate([
        {
          $lookup: {
            from: "apartments",
            localField: "apartment",
            foreignField: "_id",
            as: "Apartment",
          },
        },
        { $unwind: "$Apartment" },
        {
          $project: {
            "Apartment.user": 1,
            tenant: 1,
          },
        },
        {
          $match: {
            $or: [{ "Apartment.user": user._id }, { tenant: user._id }],
          },
        },
      ]).exec();

      const usersIds = [];
      for (let match of matches) {
        match.tenant === user._id
          ? usersIds.push(match.Apartment.user)
          : usersIds.push(match.tenant);
      }

      const users = await UserModel.find({
        _id: {
          $in: [...usersIds],
        },
      });

      const response = [];

      for (let user of users) {
        let conversation = await conversationModel.aggregate([
          {
            $lookup: {
              from: "apartments",
              localField: "apartment",
              foreignField: "_id",
              as: "Apartment",
            },
          },
          { $unwind: "$Apartment" },
          {
            $project: {
              "Apartment.user": 1,
              tenant: 1,
            },
          },
          {
            $match: {
              $or: [{ "Apartment.user": user._id }, { tenant: user._id }],
            },
          },
        ]);
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
  createConversation: async function (user, apartment) {
    try {
      const newConversation = await conversationModel.create({
        apartment,
        tenant: user,
      });
      return newConversation;
    } catch (ex) {
      throw ex;
    }
  },
  getConversation: async function (user, conversationId) {
    const conversation = await conversationModel.findOne({
      _id: conversationId,
    });
    await MessageModel.updateMany(
      { conversationId: conversation._id, sender: { $ne: user._id } },
      { status: "read" }
    );
    const messages = await MessageModel.find({
      conversationId: conversation._id,
    })
      .sort({ createdAt: 1 })
      .exec();
    return {
      messages,
    };
  },
};

module.exports = ChatService;
