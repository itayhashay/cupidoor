const Apartment = require("../model/apartment.model");
const Storage = require("./firebase-storage.service");
const match = require("../model/match");
const UserAnswer = require("../model/userAnswer.model");
const Score = require("../model/score.model");
const ScoreService = require("./score.service");
const ObjectId = require("mongoose").Types.ObjectId;
const createApartment = async (apartmentData, user) => {
  try {
    let base64Images = apartmentData.newImages;
    apartmentData.images = [];
    const apartment = new Apartment(apartmentData);
    const newApartment = await apartment.save();
    const imagesUrl = await Storage.uploadApartmentImages(
      newApartment._id.toString(),
      base64Images
    );
    await _scoreMissingApartments(user);
    return await Apartment.findByIdAndUpdate(
      newApartment._id,
      { images: imagesUrl },
      { populate: { path: "user" }, returnOriginal: false }
    );
  } catch (err) {
    throw new Error("Error creating apartment: " + err.message);
  }
};

const getApartmentsByUser = async (userId) => {
  try {
    console.time("user-apartments");
    const data = await Apartment.aggregate([
      { $match: { user: new ObjectId(userId) } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "usersrelations",
          localField: "_id",
          foreignField: "apartment",
          as: "likes",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "likes.tenant",
          foreignField: "_id",
          as: "likes",
        },
      },
      {
        $project: {
          "likes.password": 0,
          "likes.salt": 0,
          "likes.refreshToken": 0,
          "likes.email": 0,
          "likes.createdAt": 0,
          "user.password": 0,
          "user.salt": 0,
          "user.refreshToken": 0,
          "user.email": 0,
          "user.createdAt": 0,
        },
      },
    ]).exec();
    console.timeEnd("user-apartments");
    return data;
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

const getApartments = async (user) => {
  try {
    console.time("missing_score");
    await _scoreMissingApartments(user);
    console.timeEnd("missing_score");
    console.time("apartments_find");
    const apartments = await Apartment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",

          as: "user",
        },
      },
      { $unwind: "$user" },
      { $match: { "user._id": { $ne: user._id } } },
      {
        $lookup: {
          from: "usersrelations",
          localField: "_id",
          foreignField: "apartment",
          let: { apartmentId: "$_id" },
          as: "like",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$apartment", "$$apartmentId"] },
                    { $eq: ["$tenant", user._id] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                tenant: 0,
                apartment: 0,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          liked: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$like",
                        cond: {
                          $and: [
                            { $eq: ["$$this.relation", "match"] },
                            { $eq: ["$$this.status", "pending"] },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
          matched: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$like",
                        cond: {
                          $and: [
                            { $eq: ["$$this.relation", "match"] },
                            { $eq: ["$$this.status", "approved"] },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          // "like":0,
          "user.salt": 0,
          "user.password": 0,
          "user.email": 0,
          "user.refreshToken": 0,
        },
      },
    ]);

    console.timeEnd("apartments_find");

    console.time("get_scores");
    const data = await ScoreService.getApartmentsScores(user._id, apartments);
    console.timeEnd("get_scores");

    return data;
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

const getApartment = async (id, user) => {
  try {
    const apartmentPromise = Apartment.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",

          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "usersrelations",
          localField: "_id",
          foreignField: "apartment",
          let: { apartmentId: "$_id" },
          as: "like",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$apartment", "$$apartmentId"] },
                    { $eq: ["$tenant", user._id] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                tenant: 0,
                apartment: 0,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          liked: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$like",
                        cond: {
                          $and: [
                            { $eq: ["$$this.relation", "match"] },
                            { $eq: ["$$this.status", "pending"] },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
          matched: {
            $cond: {
              if: {
                $gt: [
                  {
                    $size: {
                      $filter: {
                        input: "$like",
                        cond: {
                          $and: [
                            { $eq: ["$$this.relation", "match"] },
                            { $eq: ["$$this.status", "approved"] },
                          ],
                        },
                      },
                    },
                  },
                  0,
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          // "like":0,
          "user.salt": 0,
          "user.password": 0,
          "user.email": 0,
          "user.refreshToken": 0,
        },
      },
    ]);
    // const apartmentPromise = Apartment.findById(id)
    //   .populate("user", "-password -salt -refreshToken -email -createdAt")
    //   .lean()
    //   .exec();
    const scorePromise = new Promise((resolve) => {
      const findScore = () => {
        return Score.findOne({ apartment: id, tenant: user._id })
          .select({ score: 1 })
          .lean()
          .exec();
      };

      findScore().then((score) => {
        if (!score) {
          _scoreMissingApartments(user).then(() => {
            findScore().then((score) => {
              resolve(score);
            });
          });
        } else {
          resolve(score);
        }
      });
    });

    const [apartment, score] = await Promise.all([
      apartmentPromise,
      scorePromise,
    ]);
    // apartment.images = await Storage.addBase64Value(apartment.images);

    return { ...apartment[0], match: score.score };
  } catch (err) {
    throw new Error("Error getting apartment: " + err.message);
  }
};

const updateApartment = async (id, apartmentData) => {
  try {
    const apartment = await Apartment.findById(id);
    let { newImages, removedImages } = apartmentData;
    let updatedImagesArray = apartment.images.filter(
      (image) => removedImages ? !removedImages.includes(image.name) : true
    );
    let newSavedimages = await Storage.uploadApartmentImages(id, newImages);
    apartment.images = [...updatedImagesArray, ...newSavedimages];
    if (apartmentData.description != null) {
      apartment.description = apartmentData.description;
    }
    if (apartmentData.propertyCondition != null) {
      apartment.propertyCondition = apartmentData.propertyCondition;
    }
    if (apartmentData.city != null) {
      apartment.city = apartmentData.city;
    }
    if (apartmentData.street != null) {
      apartment.street = apartmentData.street;
    }
    if (apartmentData.houseNumber != null) {
      apartment.houseNumber = apartmentData.houseNumber;
    }
    if (apartmentData.floor != null) {
      apartment.floor = apartmentData.floor;
    }
    if (apartmentData.rooms != null) {
      apartment.rooms = apartmentData.rooms;
    }
    if (apartmentData.elevator != null) {
      apartment.elevator = apartmentData.elevator;
    }
    if (apartmentData.houseArea != null) {
      apartment.houseArea = apartmentData.houseArea;
    }
    if (apartmentData.parkings != null) {
      apartment.parkings = apartmentData.parkings;
    }
    if (apartmentData.balconies != null) {
      apartment.balconies = apartmentData.balconies;
    }
    if (apartmentData.entranceDate != null) {
      apartment.entranceDate = apartmentData.entranceDate;
    }
    if (apartmentData.furnished != null) {
      apartment.furnished = apartmentData.furnished;
    }
    if (apartmentData.bars != null) {
      apartment.bars = apartmentData.bars;
    }
    if (apartmentData.boiler != null) {
      apartment.boiler = apartmentData.boiler;
    }
    if (apartmentData.airConditioner != null) {
      apartment.airConditioner = apartmentData.airConditioner;
    }
    if (apartmentData.accessible != null) {
      apartment.accessible = apartmentData.accessible;
    }
    if (apartmentData.garage != null) {
      apartment.garage = apartmentData.garage;
    }
    if (apartmentData.shelter != null) {
      apartment.shelter = apartmentData.shelter;
    }
    if (apartmentData.longTerm != null) {
      apartment.longTerm = apartmentData.longTerm;
    }
    if (apartmentData.numOfPayments != null) {
      apartment.numOfPayments = apartmentData.numOfPayments;
    }
    if (apartmentData.paymentDay != null) {
      apartment.paymentDay = apartmentData.paymentDay;
    }
    if (apartmentData.price != null) {
      apartment.price = apartmentData.price;
    }
    if (apartmentData.committee != null) {
      apartment.committee = apartmentData.committee;
    }
    if (apartmentData.tax != null) {
      apartment.tax = apartmentData.tax;
    }
    // if (apartmentData.totalPrice != null) {
    //   apartment.totalPrice = apartmentData.totalPrice;
    // }
    const price = apartmentData.price ? apartmentData.price : apartment.price;
    const tax = apartmentData.tax ? apartmentData.tax : apartment.tax;
    const committee = apartmentData.committee ? apartmentData.committee : apartment.committee;
    apartment.totalPrice = Number(price) + Number(tax) + Number(committee);
    return await apartment.save();
  } catch (err) {
    throw new Error("Error updating apartment: " + err.message);
  }
};

const deleteApartment = async (id) => {
  try {
    return await Apartment.findByIdAndRemove(id);
  } catch (err) {
    throw new Error("Error deleting apartment: " + err.message);
  }
};

const _scoreMissingApartments = async (user) => {
  const missingScoreApartments = await Apartment.aggregate([
    {
      $lookup: {
        from: "scores",
        localField: "_id",
        foreignField: "apartment",
        as: "Match",
      },
    },
    // { $match: { Match: { $eq: [] } } },
    {
      $match: { "Match.tenant": { $ne: user._id } },
    },
  ]);

  if (missingScoreApartments.length === 0) return;

  const userAnswers = await UserAnswer.find({ user: user._id })
    .populate("question")
    .lean()
    .exec();

  const promises = [];
  for (let apartment of missingScoreApartments) {
    promises.push(
      new Promise((resolve) => {
        UserAnswer.find({
          user: apartment.user._id,
        })
          .populate("question")
          .exec()
          .then((landLordAnswers) => {
            const matchData = match(userAnswers, landLordAnswers);
            const scoreData = Score.create({
              apartment: apartment._id,
              tenant: user._id,
              landlord: apartment.user,
              score: matchData,
              updatedAt: Date.now(),
            }).then(() => {
              resolve();
            });
          });
      })
    );
  }
  return Promise.all(promises);
};

/**
 * Analytics
 */

const getAllApartmentsForAdmin = async () => {
  try {
    return Apartment.find().select("-images").populate("user").lean().exec();
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

const getApartmentsCount = async () => {
  try {
    return Apartment.find({}).count().lean().exec();
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

const getMonthlyNewApartmentsCount = async () => {
  try {
    const today = new Date();
    const month = today.getMonth();
    const fromDate = new Date(today.getFullYear(), month, 1);
    return Apartment.find({
      createdAt: { $gte: fromDate, $lte: today },
    })
      .count()
      .lean()
      .exec();
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

const getApartmentsPricesAnalytics = async () => {
  try {
    return Apartment.aggregate([
      {
        $group: {
          _id: null,
          max: { $max: "$price" },
          min: { $min: "$price" },
          avg: { $avg: "$price" },
        },
      },
    ]);
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

module.exports = {
  createApartment,
  getApartmentsByUser,
  getApartments,
  getApartment,
  updateApartment,
  deleteApartment,
  getApartmentsCount,
  getMonthlyNewApartmentsCount,
  getApartmentsPricesAnalytics,
  getAllApartmentsForAdmin,
};
