const mongoose = require("mongoose");
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

  for (let i = 0; i < 50; i++) {
    await randomizeApartment(i);
  }
};

const randomizeApartment = async (i) => {
  try {
    console.log(chalk.green("Creating apartment " + i));
    const index = (await ApartmentModel.count()) || 1;
    const price = randomizeInteger(3000, 20000);
    const tax = randomizeInteger(300, 1500);
    const committee = randomizeInteger(0, 1500);
    const totalPrice = price + tax + committee;

    const livingImage = convertImageToBase64("./downloaded_images/" + index);

    const images = [...livingImage];

    const apartment = await ApartmentService.createApartment({
      accessible: randomizeBoolean(),
      airConditioner: randomizeBoolean(),
      balconies: randomizeInteger(1, 3),
      bars: randomizeBoolean(),
      boiler: randomizeBoolean(),
      createdAt: Date.now(),
      elevator: randomizeBoolean(),
      floor: randomizeInteger(1, 32),
      furnished: randomizeBoolean(),
      garage: randomizeBoolean(),
      houseNumber: randomizeInteger(1, 140),
      longTerm: randomizeBoolean(),
      numOfPayments: randomizeInteger(6, 12),
      shelter: randomizeBoolean(),
      rooms: randomizeInteger(1, 6),
      tax,
      price,
      committee,
      totalPrice,
      propertyCondition: randomizeCondition(),
      city: randomizeCity(),
      street: randomizeStreet(),
      parkings: randomizeInteger(0, 3),
      paymentDay: randomizeInteger(1, 10),
      entranceDate: randomEntryDate(),
      houseArea: randomizeInteger(30, 500),
      description: randomizeDescription(),
      user: randomizeUser(),
      images,
    });
    console.log(chalk.green("Done!"));
    return apartment;
  } catch (ex) {
    console.error(ex.message);
  }
};

const HOUSE_CONDITION = [
  "New property from a contractor (never lived in)",
  "New Property (up to 5 years old)",
  "Renovated (in the last 5 years)",
  "Property in preserved condition (in good condition not renovated)",
  "Renovation needed (renovation work needed)",
];
const randomizeCondition = () => {
  return HOUSE_CONDITION[randomizeInteger(0, HOUSE_CONDITION.length - 1)];
};
const randomizeBoolean = () => {
  return Math.random() > 0.5;
};

const randomizeCity = () => {
  return israelCities[randomizeInteger(0, israelCities.length - 1)];
};
const randomizeStreet = () => {
  return israelStreetNames[randomizeInteger(0, israelStreetNames.length - 1)];
};

const randomizeInteger = (min, max) => {
  const randomValue = Math.random();
  const scaledValue = randomValue * (max - min + 1);
  const randomInteger = Math.floor(scaledValue) + min;
  return randomInteger;
};

const randomEntryDate = () => {
  const start = new Date(2023, 6, 1);
  const end = new Date(2024, 11, 1);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const randomizeDescription = () => {
  return apartmentDescriptions[
    randomizeInteger(0, apartmentDescriptions.length - 1)
  ];
};
const randomizeUser = () => {
  return USERS[randomizeInteger(0, USERS.length - 1)];
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

bootstrap();

const USERS = [
  "648cf8b9432025b3618d0736",
  "648cf8b9432025b3618d0732",
  "648cf8b8432025b3618d0730",
];

const israelCities = [
  "Jerusalem",
  "Tel Aviv",
  "Haifa",
  "Rishon LeZion",
  "Petah Tikva",
  "Ashdod",
  "Netanya",
  "Beer Sheva",
  "Holon",
  "Bnei Brak",
  "Ramat Gan",
  "Ashkelon",
  "Rehovot",
  "Bat Yam",
  "Herzliya",
  "Kfar Saba",
  "Ra'anana",
  "Eilat",
  "Nazareth",
  "Modi'in",
  "Hadera",
  "Lod",
  "Ramla",
  "Acre",
  "Bet Shemesh",
  "Kiryat Ata",
  "Kiryat Gat",
  "Kiryat Motzkin",
  "Kiryat Yam",
  "Nahariya",
  "Safed",
  "Dimona",
  "Tiberias",
  "Yavne",
  "Or Yehuda",
  "Ofaqim",
  "Maalot-Tarshiha",
  "Afula",
  "Beit Shemesh",
  "Yehud",
  "Nesher",
  "Sderot",
  "Karmiel",
  "Rosh Ha'ayin",
  "Arad",
  "Hod HaSharon",
  "Migdal HaEmek",
  "Nof HaGalil",
  "Beersheba",
  "Tirat Carmel",
  "Kiryat Ono",
  "Qalansawe",
  "Hatzor HaGlilit",
  "Mitzpe Ramon",
  "Or Akiva",
  "Kiryat Shmona",
  "Batzra",
  "Lod",
  "Tamra",
  "Sakhnin",
  "Daliyat al-Karmel",
  "Tayibe",
  "Binyamina-Giv'at Ada",
  "Tira",
  "Givat Shmuel",
  "Elyakhin",
  "Dabburiya",
  "Kefar Tavor",
  "Elyakhin",
  "Beit She'an",
  "Kfar Yona",
  "Mazkeret Batya",
  "Gedera",
  "Qiryat Mozqin",
  "Beitar Illit",
  "Ein Mahil",
  "Sde Boker",
  "Zikhron Ya'akov",
  "Mazkeret Batya",
  "Kiryat Malakhi",
  "Oranit",
  "Yehud-Monosson",
  "Qiryat Bialik",
  "Jisr az-Zarqa",
  "Savyon",
  "Omer",
  "Lehavim",
  "Giv'at Ze'ev",
  "Ari'el",
  "Jaljulia",
  "Katzrin",
  "Zefat",
];

const israelStreetNames = [
  "Ben Yehuda Street",
  "Rothschild Boulevard",
  "Dizengoff Street",
  "Allenby Street",
  "King George Street",
  "HaYarkon Street",
  "Herzl Street",
  "Ibn Gabirol Street",
  "Rambam Street",
  "Jabotinsky Street",
  "Gordon Street",
  "HaCarmel Street",
  "HaHashmonaim Street",
  "Emek Refaim Street",
  "Yaffo Street",
  "Rashi Street",
  "Ben Gurion Boulevard",
  "Yigal Alon Street",
  "HaPalmach Street",
  "Ben Shemen Street",
  "Bialik Street",
  "Shaul HaMelech Boulevard",
  "HaAliyah Street",
  "Keren HaYesod Street",
  "HaGefen Street",
  "HaTikva Street",
  "Herzl Street",
  "Kaplan Street",
  "HaShalom Street",
  "HaRav Kook Street",
  "Sderot Rothschild",
  "HaNeviim Street",
  "Salame Street",
  "HaAvoda Street",
  "HaTavor Street",
  "Ben Avigdor Street",
  "Herzl Rosenblum Street",
  "Rosh Pina Street",
  "HaRav Herzog Street",
  "Arlozorov Street",
  "HaAmal Street",
  "Weizmann Street",
  "HaMigdal Street",
  "HaShahaf Street",
  "Kiryat HaMelacha Street",
  "HaTidhar Street",
  "HaRakevet Street",
  "HaGalil Street",
  "HaKishon Street",
  "HaGolan Street",
  "HaNegev Street",
  "HaPerach Street",
  "HaYarden Street",
  "HaMerkava Street",
  "HaMetzuda Street",
  "HaSolelim Street",
  "HaEshkol Street",
  "HaMasada Street",
  "HaYam Suf Street",
  "HaDekel Street",
  "HaHilazon Street",
  "HaNarkis Street",
  "HaNarkisim Street",
  "HaMagen Street",
  "HaPalmachim Street",
  "HaZayit Street",
  "HaTeena Street",
  "HaTe'ena Street",
  "HaNurit Street",
  "HaAgam Street",
  "HaGefen Street",
  "HaKalanit Street",
  "HaGat Street",
  "HaSharon Street",
  "HaDekel Street",
  "HaNadiv Street",
  "HaGilboa Street",
  "HaAyalon Street",
  "HaChofetz Chaim Street",
  "HaEshkol Street",
  "HaAtzmaut Street",
  "HaRakefet Street",
  "HaAlon Street",
  "HaIlanot Street",
  "HaAnafim Street",
  "HaPerahim Street",
  "HaDror Street",
  "HaGra'e Street",
  "HaGefen Street",
  "HaMaayan Street",
  "HaPitom Street",
  "HaShaket Street",
  "HaMeir Street",
  "HaLevanon Street",
  "HaZayit Street",
];

const apartmentDescriptions = [
  "Comfortable apartment in a convenient location.",
  "Affordable apartment with modern amenities.",
  "Spacious apartment with ample natural light.",
  "Cozy apartment with a functional layout.",
  "Centrally located apartment with easy access to transportation.",
  "Quiet and peaceful apartment in a residential area.",
  "Well-maintained apartment with a welcoming atmosphere.",
  "Contemporary apartment with tasteful design.",
  "Clean and tidy apartment in a well-established neighborhood.",
  "Functional apartment with all the essential features.",
  "Secure apartment with controlled access and surveillance.",
  "Accessible apartment with elevator and wheelchair-friendly facilities.",
  "Bright apartment with large windows and pleasant views.",
  "Conveniently furnished apartment ready for immediate occupancy.",
  "Reliable apartment with responsive property management.",
  "Pet-friendly apartment with nearby parks and pet services.",
  "Efficient apartment with energy-saving features.",
  "Modern apartment with up-to-date appliances.",
  "Affordable and low-maintenance apartment option.",
  "Versatile apartment suitable for individuals or small families.",
  "Well-connected apartment with high-speed internet and connectivity options.",
  "Friendly community in a well-established apartment complex.",
  "Ample storage space in this spacious apartment.",
  "Welcoming apartment with a community pool and recreational facilities.",
  "Conveniently located near shopping centers and entertainment venues.",
  "Flexible lease terms available for this apartment.",
  "Peaceful apartment complex with beautifully landscaped gardens.",
  "Well-designed apartment with a comfortable living environment.",
  "Secure parking available for residents of this apartment building.",
  "Thoughtfully laid out apartment with functional living spaces.",
  "Stylish and contemporary apartment with modern finishes.",
  "Affordable rent for this comfortable apartment.",
  "Convenient amenities and services available near this apartment complex.",
  "Spacious closets and ample storage solutions in this apartment.",
  "Tranquil apartment in a serene and scenic location.",
  "Beautifully renovated apartment with updated features.",
  "Great value for money in this affordable apartment.",
  "Professional and responsive maintenance staff for this apartment building.",
  "Close proximity to schools, hospitals, and other essential services.",
  "Open-concept apartment with a flexible floor plan.",
  "Safe and secure apartment with 24-hour security.",
  "Comfortable living spaces in this well-appointed apartment.",
];
