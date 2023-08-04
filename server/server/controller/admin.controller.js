const UserService = require("../service/user.service");
const ApartmentService = require("../service/apartment.service");
const UsersRelationsService = require("../service/usersRelations.service");
const {
  CREATED,
  OK,
  NOT_FOUND,
  NO_CONTENT,
  INTERNAL_SERVER_ERROR,
} = require("http-status-codes");
const ChatService = require("../service/chat.service");

const AdminController = {
  async getAllUsers(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      res.status(OK).json({
        success: true,
        users: await UserService.getUsersWithoutAuth(),
      });
    } catch (ex) {
      next(ex);
    }
  },
  async getAllApartments(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      const apartments = await ApartmentService.getAllApartmentsForAdmin();
      res.status(OK).json({ success: true, apartments });
    } catch (ex) {
      next(ex);
    }
  },
  async getAnalytics(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      const newMonthlyApartments =
        ApartmentService.getMonthlyNewApartmentsCount();
      const apartmentsCount = ApartmentService.getApartmentsCount();
      const apartmentsPrices = ApartmentService.getApartmentsPricesAnalytics();

      const newMonthlyUsers = UserService.getMonthlyNewUsersCount();
      const usersCount = UserService.getUsersCount();
      const userRolesPromise = UserService.getUsersByRole();

      const matchesCount = UsersRelationsService.getAllMatches();
      const newMonthlyMatches = UsersRelationsService.getAllMatches(true);

      const totalChatConversationsPromise = ChatService.getAllConversations();
      const totalChatMessagesPromise = ChatService.getAllMessages();

      const [
        newApartments,
        newUsers,
        newMatches,
        totalMatches,
        totalUsers,
        totalApartments,
        pricesApartments,
        userRoles,
        totalChatConversations,
        totalChatMessages,
      ] = await Promise.all([
        newMonthlyApartments,
        newMonthlyUsers,
        newMonthlyMatches,
        matchesCount,
        usersCount,
        apartmentsCount,
        apartmentsPrices,
        userRolesPromise,
        totalChatConversationsPromise,
        totalChatMessagesPromise,
      ]);
      const users = {
        month: newUsers.length,
        total: totalUsers.length,
        roles: userRoles,
      };
      const apartments = {
        month: newApartments.length,
        total: totalApartments.length,
        ...pricesApartments[0],
      };
      const matches = {
        total: totalMatches.length,
        month: newMatches.length,
      };
      const chats = {
        total: totalChatConversations[0].count,
        messages: totalChatMessages[0].count,
      };
      res
        .status(200)
        .json({ success: true, matches, users, apartments, chats });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = AdminController;
