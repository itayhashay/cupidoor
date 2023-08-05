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
const AuthService = require("../service/auth.service");

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
  async getUser(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      res.status(OK).json({
        success: true,
        user: await UserService.getUserData(req.params.userId),
      });
    } catch (ex) {
      next(ex);
    }
  },

  async getUsersAnalytics(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      const monthlyUsersPromise = UserService.getMonthlyNewUsersCount();
      const monthlyUsersAvatarsPromise =
        UserService.getMonthlyNewUsersAvatars();
      const totalUsersPromise = UserService.getUsersCount();
      const userRolesPromise = UserService.getUsersByRole();

      const [monthlyUsers, monthlyUsersAvatars, totalUsers, userRoles] =
        await Promise.all([
          monthlyUsersPromise,
          monthlyUsersAvatarsPromise,
          totalUsersPromise,
          userRolesPromise,
        ]);
      const usersAnalytics = {
        month: monthlyUsers.length,
        total: totalUsers.length,
        roles: userRoles,
        avatars: monthlyUsersAvatars,
      };

      res.status(200).json({ success: true, usersAnalytics });
    } catch (ex) {
      next(ex);
    }
  },
  async getApartmentsAnalytics(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      const monthlyApartmentPromise =
        ApartmentService.getMonthlyNewApartmentsCount();
      const apartmentsCountPromise = ApartmentService.getApartmentsCount();
      const apartmentsPricesPromise =
        ApartmentService.getApartmentsPricesAnalytics();

      const [monthlyApartments, apartmentsCount, apartmentsPrices] =
        await Promise.all([
          monthlyApartmentPromise,
          apartmentsCountPromise,
          apartmentsPricesPromise,
        ]);

      const apartmentsAnalytics = {
        month: monthlyApartments,
        total: apartmentsCount,
        ...apartmentsPrices[0],
      };

      res.status(200).json({ success: true, apartmentsAnalytics });
    } catch (ex) {
      next(ex);
    }
  },
  async getMatchesAnalytics(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      const matchesCountPromise = UsersRelationsService.getTotalMatchesCount();
      const newMonthlyMatchesPromise =
        UsersRelationsService.getMonthlyNewMatchesCount();

      const [newMatches, totalMatches] = await Promise.all([
        matchesCountPromise,
        newMonthlyMatchesPromise,
      ]);

      const matchesAnalytics = {
        total: totalMatches,
        month: newMatches,
      };
      res.status(200).json({ success: true, matchesAnalytics });
    } catch (ex) {
      next(ex);
    }
  },
  async getChatAnalytics(req, res, next) {
    if (!req.isAdmin) {
      return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
    }
    try {
      const totalChatConversationsPromise = ChatService.getConversationsCount();
      const totalChatMessagesPromise = ChatService.getMessagesCount();

      const [totalChatConversations, totalChatMessages] = await Promise.all([
        totalChatConversationsPromise,
        totalChatMessagesPromise,
      ]);

      const chatsAnalytics = {
        total: totalChatConversations[0].count,
        messages: totalChatMessages[0].count,
      };
      res.status(200).json({ success: true, chatsAnalytics });
    } catch (ex) {
      next(ex);
    }
  },
  async adminUpdateUser(req, res, next) {
    const { userId,newPassword } = req.body;
    try {
      if (!req.isAdmin){
        return res.status(403).json({ sucess: false, error: "UnAuthorized!" });
      }
      await AuthService.adminUpdatePassword(userId, newPassword);
        res.status(200).json({ success: true });
    } catch (ex) {
      next(ex);
    }
  },
};

module.exports = AdminController;
