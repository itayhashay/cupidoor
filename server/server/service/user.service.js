const User = require('../model/user.model');
const storage = require('../service/firebase-storage.service')

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
}

const getUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw new Error('Error getting users: ' + err.message);
  }
}

const getUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (err) {
    throw new Error('Error getting user: ' + err.message);
  }
}

const getUserByEmail = async (email) => {
  try {
    return await User.findOne({ email: email });
  } catch (err) {
    throw new Error('Error getting user: ' + err.message);
  }
}

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
    return await user.save();
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
}

const deleteUser = async (id) => {
  try {
    return await User.findByIdAndDelete(id);
  } catch (err) {
    throw new Error('Error deleting user: ' + err.message);
  }
}

const getUserPhoto = async (id) => {
  try {
    return { avatar: await storage.downloadProfilePhoto(id) };
  } catch (err) {
    throw new Error('Error getting user photo: ' + err.message);
  }
}

const uploadUserPhoto = async (id, base64Photo) => {
  try {
    return { avatar: await storage.uploadProfilePhoto(id, base64Photo) };
  } catch (err) {
    throw new Error('Error getting user photo: ' + err.message);
  }
}

module.exports = {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUser,
  deleteUser,
  getUserPhoto,
  uploadUserPhoto
};