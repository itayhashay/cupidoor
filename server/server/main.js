const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParaser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const { initializeChat } = require("./middlewares/chat");
const errorHandler = require("./middlewares/errorHandler");
const { env } = require("process");
const swaggerDocument = require("./swagger.json");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
const allowedOrigins = [
  "http://193.106.55.150:3000",
  "http://cupidoor.cs.colman.ac.il",
  "http://cupidoor.cs.colman.ac.il:3000",
  "http://localhost:3000",
  "http://localhost:2308",
];
const swaggerSpec = swaggerJsDoc(swaggerDocument);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) > -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS Error: Access denied for origin:" + origin));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParaser());

app.use(mongoSanitize());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use("/", require("./router"));
app.use(errorHandler);

const startServer = async () => {
  try {
    console.log(chalk.yellow("\nTrying to connect to mongoDB"));
    await mongoose.connect(process.env.MONGOURI);

    console.log(chalk.green("MongoDB connected successfully"));
  } catch (ex) {
    console.error(ex.message);
    console.log(chalk.red(ex.stack));
  }

  const server = app.listen(process.env.PORT, () => {
    console.log(chalk.green(`\nServer listening on port: ${PORT}\n`));
  });
  initializeChat(server);
};

startServer();

module.exports = app;
