const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const chalk = require("chalk");
require("dotenv").config({ path: "../.env" });
const ApartmentModel = require("../model/apartment.model");
const UserModel = require("../model/user.model");
const ApartmentService = require("../service/apartment.service");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  StringFormat,
} = require("firebase/storage");
const Storage = require("../service/firebase-storage.service");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const bootstrap = async () => {
  console.log(chalk.yellow("\nTrying to connect to mongoDB"));
  await mongoose.connect(process.env.MONGOURI);
  console.log(chalk.green("MongoDB connected successfully"));

  const users = [
    new ObjectId("648cf8b8432025b3618d0730"),
    new ObjectId("648cf8b9432025b3618d0732"),
    new ObjectId("648cf8b9432025b3618d0736"),
  ];

  const apartments = await ApartmentModel.find({ user: { $in: users } }).exec();

  let index = 1;
  for (let apartment of apartments) {
    const images = getImages(index);
    const imagesUrl = await Storage.uploadApartmentImages(
      apartment._id.toString(),
      images
    );

    fs.writeFileSync(
      `./urls/${index}.js`,
      `const urls = ${JSON.stringify(imagesUrl)}`
    );

    await ApartmentModel.findOneAndUpdate(
      { _id: apartment._id },
      { images: imagesUrl }
    );
    console.log("Success!" + index);

    index++;
  }
};

function convertImageToBase64(filePath) {
  const images = [];
  try {
    // Read the image file as a Buffer
    const files = fs.readdirSync(filePath);
    for (let file of files) {
      const imageBuffer = fs.readFileSync(`${filePath}/${file}`);
      // Convert the image Buffer to Base64
      const base64Image = imageBuffer.toString("base64");
      images.push(`data:image/jpg;base64,` + base64Image);
    }

    return images;
  } catch (error) {
    console.error("Error converting image to Base64:", error);
    throw error;
  }
}

const getImages = (index) => {
  console.log(index);
  const livingImage = convertImageToBase64(`./downloaded_images/${index}`);

  const images = [...livingImage];
  return images;
};

bootstrap();
