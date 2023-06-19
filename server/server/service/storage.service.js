const Storage =
  process.env.STORAGE_PROVIDER === "CLOUDINARY"
    ? require("./cloudinaryStorage.service")
    : require("./firebase-storage.service");

module.exports = { ...Storage };
