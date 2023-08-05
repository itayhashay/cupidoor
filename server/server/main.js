const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParaser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const {initializeChat} = require("./middlewares/chat");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const PORT = process.env.PORT || 2308;
const app = express();

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Cupidoor Swagger",
			version: "1.0.0",
			description: "Swagger For The Best Tenant-Apartments Matching Website!",
		},
		servers: [
			{
				url: "http://localhost:2308",
			},
		],
	},
	apis: ["./routes/*.js", "./controller/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({limit:"50mb"}));
app.use(cookieParaser());

app.use(mongoSanitize());

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

  const server = app.listen(2308, () => {
    console.log(chalk.green(`\nServer listening on port: ${PORT}\n`));
  });
  initializeChat(server);
};

startServer();
