const User = require("../model/user.model");
const storage = require("../service/firebase-storage.service");
const isBase64 = require("is-base64");

const createUser = async (userData) => {
  try {
    if (userData.avatar && isBase64(userData.avatar, { allowMime: true })) {
      userData.avatar = await storage.uploadProfilePhoto(
        userData.email,
        userData.avatar
      );
    } else {
      // default avatar
      userData.avatar =
        "https://firebasestorage.googleapis.com/v0/b/cupidoor-9a428.appspot.com/o/profiles%2Fdefault.png?alt=media&token=00ade410-04a4-44a5-9b88-615386abf78c&_gl=1*gjdizj*_ga*MTI1MDUwODEwMi4xNjg1OTA0NDkx*_ga_CW55HF8NVT*MTY4NjA3Mzg2MS4yLjEuMTY4NjA3Mzk1Mi4wLjAuMA..";
    }
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

const getUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw new Error("Error getting users: " + err.message);
  }
};

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    throw new Error("Error getting user: " + err.message);
  }
};

const getUserData = async (id) => {
  try {
    return await User.findById(id)
      .select("-password -salt -refreshToken")
      .exec();
  } catch (err) {
    throw new Error("Error getting user: " + err.message);
  }
};

const getUsersForChat = async (id) => {
  try {
    const users = await User.findById(id, ["_id", "name", "avatar"]).exec();
    return users;
  } catch (err) {
    throw new Error("Error getting user: " + err.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (err) {
    throw new Error("Error getting user: " + err.message);
  }
};

const updateUser = async (id, userData) => {
  try {
    const user = await User.findById(id);
    if (userData.name != null) {
      user.name = userData.name;
    }
    if (userData.email != null) {
      user.email = userData.email;
    }
    if (userData.firstName != null) {
      user.firstName = userData.firstName;
    }
    if (userData.lastName != null) {
      user.lastName = userData.lastName;
    }
    if (userData.age != null) {
      user.age = userData.age;
    }
    if (userData.password != null) {
      user.password = userData.password;
    }
    if (userData.role != null) {
      user.role = userData.role;
    }
    if(userData.phone != null){
      user.phone = userData.phone;
    }
    if(userData.description != null){
      user.description = userData.description;
    }
    if(userData.jobTitle != null){
      user.jobTitle = userData.jobTitle;
    }
    if (userData.avatar && isBase64(userData.avatar, { allowMime: true })) {
      userData.avatar = await storage.uploadProfilePhoto(
        userData.email,
        userData.avatar
      );
      user.avatar = userData.avatar;
    }
    await user.save();
    return await User.findById(id).select("-password -salt -refreshToken");
  } catch (err) {
    throw err;
  }
};

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    throw new Error("Error deleting user: " + err.message);
  }
};

const getUserPhoto = async (id) => {
  try {
    return { avatar: await storage.downloadProfilePhoto(id) };
  } catch (err) {
    throw new Error("Error getting user photo: " + err.message);
  }
};

const uploadUserPhoto = async (id, base64Photo) => {
  try {
    return { avatar: await storage.uploadProfilePhoto(id, base64Photo) };
  } catch (err) {
    throw new Error("Error getting user photo: " + err.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserPhoto,
  uploadUserPhoto,
  getUsersForChat,
  getUserData,
};
