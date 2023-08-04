const { forceUpdate } = require("../middlewares/chat");
const UsersRelations = require("../model/usersRelations.model");
const ScoreService = require("./score.service");
const ObjectId = require("mongoose").Types.ObjectId;

const getAllMatches = async (thisMonth) => {
  try {
    return await UsersRelations.find({ relation: "match", status: "approved" })
      .lean()
      .exec();
  } catch (err) {
    throw new Error("Error getting matches: " + err.message);
  }
};

const getLikesByTenantId = async (tenantId) => {
  try {
    const likesPromise = UsersRelations.find({
      tenant: tenantId,
      relation: "match",
      status: "pending",
    })
      .select("apartment")
      .populate([
        {
          path: "apartment",
          populate: {
            path: "user",
            select: { firstName: 1, lastName: 1, avatar: 1 },
          },
        },
      ])
      .lean()
      .exec();
    const matchesPromise = UsersRelations.find({
      tenant: tenantId,
      relation: "match",
      status: "approved",
    })
      .select("apartment")
      .populate([
        {
          path: "apartment",
          populate: {
            path: "user",
            select: { firstName: 1, lastName: 1, avatar: 1 },
          },
        },
      ])
      .lean()
      .exec();

    const [likes, matches] = await Promise.all([likesPromise, matchesPromise]);

    const apartmentsLikes = likes.map((like) => {
      return { ...like.apartment, liked: true };
    });
    const apartmentsMatches = matches.map((match) => {
      return { ...match.apartment, matched: true };
    });
    const apartments = [...apartmentsMatches, ...apartmentsLikes];
    return await ScoreService.getApartmentsScores(tenantId, apartments);
  } catch (err) {
    throw new Error("Error getting liked apartments: " + err.message);
  }
};

const getMatchesByTenantId = async (tenantId) => {
  try {
    return await UsersRelations.find({ tenant: tenantId, status: "approved" });
  } catch (err) {
    throw new Error("Error getting matched apartments: " + err.message);
  }
};

const getLikesByApartmentId = async (apartmentId) => {
  try {
    const likes = await UsersRelations.find({
      apartment: new ObjectId(apartmentId),
      status: "pending",
    })
      .populate("tenant", "_id avatar firstName lastName")
      .select("tenant")
      .lean()
      .exec();
    const users = likes.map((like) => like.tenant);
    const promises = [];
    for (let user of users) {
      promises.push(
        ScoreService.getApartmentsScores(user._id, [
          { _id: apartmentId, user: { ...user } },
        ])
      );
    }
    let scores = await Promise.all(promises);
    scores = scores.map((score) => ({
      ...score[0].user,
      match: score[0].match,
    }));
    return scores;
  } catch (err) {
    throw new Error("Error getting likes of apartment: " + err.message);
  }
};

const getMatchesByApartmentId = async (apartmentId) => {
  try {
    return await UsersRelations.find({
      apartment: apartmentId,
      status: "approved",
    });
  } catch (err) {
    throw new Error("Error getting matches of apartment: " + err.message);
  }
};

const likeApartment = async (tenantId, apartmentId) => {
  try {
    const relation = await UsersRelations.findOne({
      apartment: apartmentId,
      tenant: tenantId,
    });
    // if the relation already exist it delete the relation
    if (!relation) {
      const newRelation = new UsersRelations({
        tenant: tenantId,
        apartment: apartmentId,
        status: "pending",
        relation: "match",
      });
      return await newRelation.save();
    } else {
      return await UsersRelations.findByIdAndDelete(relation._id);
    }
  } catch (err) {
    throw new Error("Error create a like/unlike: " + err.message);
  }
};

const matchTenant = async (tenantId, apartmentId, landLordId) => {
  try {
    const relation = await UsersRelations.findOne({
      apartment: apartmentId,
      tenant: tenantId,
    });
    const response = await UsersRelations.findByIdAndUpdate(
      relation._id,
      { status: "approved" },
      { populate: { path: "tenant apartment" }, returnOriginal: false }
    );
    forceUpdate(tenantId);
    forceUpdate(landLordId);
    return response;
  } catch (err) {
    throw new Error("Error match tenant: " + err.message);
  }
};

const declineTenet = async (tenantId, apartmentId) => {
  try {
    const relation = await UsersRelations.findOne({
      apartment: apartmentId,
      tenant: tenantId,
    });
    return await UsersRelations.findByIdAndUpdate(
      relation._id,
      { status: "declined" },
      { populate: { path: "tenant apartment" }, returnOriginal: false }
    );
  } catch (err) {
    throw new Error("Error decline tenant: " + err.message);
  }
};

/**
 * Analytics
 */
const getTotalMatchesCount = async () => {
  try {
    return await UsersRelations.find({ relation: "match", status: "approved" })
      .count()
      .lean()
      .exec();
  } catch (err) {
    throw new Error("Error getting matches: " + err.message);
  }
};

const getMonthlyNewMatchesCount = async () => {
  try {
    const today = new Date();
    const month = today.getMonth();
    const fromDate = new Date(today.getFullYear(), month, 1);
    return await UsersRelations.find({
      relation: "match",
      status: "approved",
      createdAt: { $gte: fromDate, $lte: today },
    })
      .count()
      .lean()
      .exec();
  } catch (err) {
    throw new Error("Error getting matches: " + err.message);
  }
};

module.exports = {
  getAllMatches,
  getLikesByTenantId,
  getMatchesByTenantId,
  getLikesByApartmentId,
  getMatchesByApartmentId,
  likeApartment,
  matchTenant,
  declineTenet,
  getTotalMatchesCount,
  getMonthlyNewMatchesCount,
};
