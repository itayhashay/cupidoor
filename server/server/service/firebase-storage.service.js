
const { initializeApp } = require("firebase/app");
const  { getStorage, ref,uploadString,getDownloadURL } = require("firebase/storage");
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
    await uploadString(profilePhotoRef, base64Photo, 'base64');
    return downloadProfilePhoto(userEmail);
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
}

module.exports = {
  downloadProfilePhoto,
  uploadProfilePhoto
}


