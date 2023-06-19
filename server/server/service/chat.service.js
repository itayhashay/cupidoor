const conversationModel = require("../model/conversation.model");
const UserService = require("../service/user.service");
const UsersRelationsModel = require("../model/usersRelations.model");
const MessageModel = require("../model/message.model");
const UserModel = require("../model/user.model");
const ApartmentModel = require("../model/apartment.model");
const ObjectId = require("mongoose").Types.ObjectId;

const ChatService = {
  getTenantMatches: async function (user) {
    let matches = await UsersRelationsModel.find({
      tenant: user._id,
      relation: "match",
      status: "approved",
    })
      .populate({
        path: "apartment",
        populate: {
          path: "user",
        },
      })
      .lean()
      .exec();

    const response = [];
 
    for (let match of matches) {
      const promises = [];
      let conversation = await conversationModel
        .findOne({
          apartment: match.apartment._id,
        })
        .lean();

      if (!conversation) {
        conversation = await this.createConversation(
          user._id,
          match.apartment._id
        );
      }
      promises.push(
        MessageModel.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .limit(1)
          .lean()
          .exec()
      );

      promises.push(
        MessageModel.countDocuments({
          conversationId: conversation._id,
          sender: { $ne: user._id },
          status: "sent",
        }).lean()
      );

      const [lastMessage, notifications] = await Promise.all(promises);

      response.push({
        _id: match.apartment._id,
        name: `${match.apartment.city},${match.apartment.street} ${match.apartment.houseNumber}`,
        avatar: match.apartment.images[0].url,
        conversationId: conversation._id,
        lastMessage: lastMessage ? lastMessage.text : "",
        notifications,
        receiver: {
          _id: match.apartment.user._id,
          name:
            match.apartment.user.firstName +
            " " +
            match.apartment.user.lastName,
          avatar: match.apartment.user.avatar,
        },
      });
    }

    return response;
  },
  getLandlordMatches: async function (user) {
    if (user.role === "tenant") return [];

    const matches = await UsersRelationsModel.aggregate([
      {$match:{
        "relation":"match",
        "status":"approved"
      }},
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
          "Apartment.user": user._id
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
      
      const apartment = await ApartmentModel.findOne({
        _id: match.Apartment._id,
      });

      for (let tenant of match.tenant) {
        console.log(tenant);
        const matchUser = await UserModel.findOne({ _id: tenant });
        
        let conversation = await conversationModel.findOne({
          tenant: matchUser._id,
          apartment:apartment._id
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
            title: `${apartment.city},${apartment.street} ${apartment.houseNumber}`,
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
      _id: new ObjectId(conversationId),
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
