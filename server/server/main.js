const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParaser = require("cookie-parser");

const path = require("path");
require('dotenv').config();

const PORT = process.env.PORT || 2308;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParaser());

app.use("/", require("./router"));

const startServer = async () => {
  try {
    console.log(chalk.yellow("\nTrying to connect to mongoDB"));
    await mongoose.connect(process.env.MONGOURI);
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
