const Apartment = require("../model/apartment.model");

const createApartment = async (apartmentData) => {
  try {
    const apartment = new Apartment(apartmentData);
    return await apartment.save();
  } catch (err) {
    throw new Error("Error creating apartment: " + err.message);
  }
};

const getApartments = async (userId) => {
  try {
    return await Apartment.aggregate([
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
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          like: {
            $cond: {
              if: {
                $in: [userId, "$likes.tenant"],
              },
              then: true,
              else: false,
            },
          },
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      {
        $project: {
          likes: 0,
          "user.password": 0,
          "user.salt": 0,
          "user.refreshToken": 0,
        },
      },
    ]).exec();
  } catch (err) {
    throw new Error("Error getting apartments: " + err.message);
  }
};

const getApartment = async (id) => {
  try {
    return await Apartment.findById(id).populate("user", "-password");
  } catch (err) {
    throw new Error("Error getting apartment: " + err.message);
  }
};

const updateApartment = async (id, apartmentData) => {
  try {
    const apartment = await Apartment.findById(id);
    if (apartmentData.type != null) {
      apartment.type = apartmentData.type;
    }
    if (apartmentData.user != null) {
      apartment.user = apartmentData.user;
    }
    if (apartmentData.address != null) {
      apartment.address = apartmentData.address;
    }
    if (apartmentData.cost != null) {
      apartment.cost = apartmentData.cost;
    }
    if (apartmentData.description != null) {
      apartment.description = apartmentData.description;
    }
    if (apartmentData.floor != null) {
      apartment.floor = apartmentData.floor;
    }
    if (apartmentData.parkings != null) {
      apartment.parkings = apartmentData.parkings;
    }
    if (apartmentData.rooms != null) {
      apartment.rooms = apartmentData.rooms;
    }
    if (apartmentData.isBasement != null) {
      apartment.isBasement = apartmentData.isBasement;
    }
    if (apartmentData.haveBoiler != null) {
      apartment.haveBoiler = apartmentData.haveBoiler;
    }
    if (apartmentData.haveBalcony != null) {
      apartment.haveBalcony = apartmentData.haveBalcony;
    }
    if (apartmentData.furnished != null) {
      apartment.furnished = apartmentData.furnished;
    }
    if (apartmentData.accessible != null) {
      apartment.accessible = apartmentData.accessible;
    }
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

module.exports = {
  createApartment,
  getApartments,
  getApartment,
  updateApartment,
  deleteApartment,
};
