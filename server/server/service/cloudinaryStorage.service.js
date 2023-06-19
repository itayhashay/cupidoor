const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadProfilePhoto = async (userEmail, base64Photo) => {
  try {
    return await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        base64Photo,
        {
          public_id: `profiles/${userEmail}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result.secure_url);
        }
      );
    });
  } catch (err) {
    console.error(err);
  }
};

const uploadApartmentImages = async (apartmentId, base64Images) => {
  const promises = [];
  for (let image of base64Images) {
    const promise = new Promise((resolve, reject) => {
      const fileName = `${uuidv4()}`;
      cloudinary.uploader.upload(
        image,
        { public_id: `apartments/${apartmentId}/${fileName}` },
        (error, result) => {
          console.error(error);
          console.log(result);
          if (error) {
            reject(error);
            return;
          }

          resolve({ name: result.public_id, url: result.secure_url });
        }
      );
    });
    promises.push(promise);
  }
  return Promise.all(promises);
};

module.exports = {
  uploadProfilePhoto,
  uploadApartmentImages,
};
