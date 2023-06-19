const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadApartmentImages = async (apartmentId, base64Images) => {
  const promises = [];
  console.log("Hey");
  console.log(base64Images);
  for (let image of base64Images) {
    const promise = new Promise((resolve, reject) => {
      const fileName = `${uuidv4()}.png`;
      cloudinary.uploader.upload(
        image,
        { public_id: `apartments/${apartmentId}/${fileName}` },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result.url);
        }
      );
    });
    promises.push(promise);
  }
  return Promise.all(promises);
};

module.exports = {
  uploadApartmentImages,
};
