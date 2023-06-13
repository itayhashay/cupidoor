const { initializeApp } = require("firebase/app");
const  { getStorage, ref,uploadString,getDownloadURL, StringFormat } = require("firebase/storage");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// gets user email and profile photo in base64 format and upload it to firebase, returns the url of the photo
const uploadProfilePhoto = async (userEmail, base64Photo) => {
  try {
    const profilePhotoRef = ref(storage, `profiles/${userEmail}.png`);
    
    await uploadString(profilePhotoRef, base64Photo, StringFormat.DATA_URL,{contentType:"image/png"});
     const url = await downloadProfilePhoto(userEmail);
     return url;
  } catch (err) {
    console.log(err);
  }
}
 
// get user email and returns the url of the photo
const downloadProfilePhoto = async (userEmail) => {
  try {
    const profilePhotoRef = ref(storage, `profiles/${userEmail}.png`);
    return await getDownloadURL(profilePhotoRef);
  } catch (err) {
    console.log(err)
  }
};

//get apartment id and array of base 64 images and returns an array of urls of images
const uploadApartmentImages = async (apartmentId, base64ImagesArray) => {
  try {
    let images = [];
    for (const [index, image] of base64ImagesArray.entries()) {
      const fileName = `${uuidv4()}.png`;
      const imageRef = ref(storage, `apartments/${apartmentId}/${fileName}`);
      await uploadString(imageRef, image, StringFormat.DATA_URL, { contentType: "image/png" });
      let url = await getDownloadURL(imageRef);
      images.push({ name: fileName,url: url});
    }
    return images;
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  downloadProfilePhoto,
  uploadProfilePhoto,
  uploadApartmentImages
}
