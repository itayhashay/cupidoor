const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
process.env.rootDir = __dirname;

const PORT = process.env.PORT || 2308;
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", require("./router"));

const startServer = async () => {
  try {
    console.log(chalk.yellow("\nTrying to connect to mongoDB"));
    await mongoose.connect("mongodb+srv://admin:Password1@cluster0.101ejri.mongodb.net/cupidoor");
    console.log(chalk.green("MongoDB connected successfully"));
  } catch (ex) {
    console.error(ex.message);
    console.log(chalk.red(ex.stack));
  }

  app.listen(2308, () => {
    console.log(chalk.green(`\nServer listening on port: ${PORT}\n`));
  });
};

startServer();
