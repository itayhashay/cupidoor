const { initializeApp } = require("firebase/app");
const  { getStorage, ref,uploadString,getDownloadURL, StringFormat } = require("firebase/storage");
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

//get user email and array of base 64 images and returns an array of urls of images
const uploadApartmentImages = async (userEmail, base64ImagesArray) => {
  try {
    let urls = [];
    base64ImagesArray.forEach(async (image, index) => {
      const fileName = `${userEmail}-${index}.png`;
      const imageRef = ref(storage, `apartments/${userEmail}/${fileName}`);
      await uploadString(imgaeRef, image, StringFormat.DATA_URL, { contentType: "image/png" });
      urls = [...urls, await getDownloadURL(imageRef)];
    });
    return urls;
  } catch (err) {
    console.log(err)
  }
};

module.exports = {
  downloadProfilePhoto,
  uploadProfilePhoto,
  uploadApartmentImages
}


