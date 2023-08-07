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
const { env } = require("process");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
const allowedOrigins = ["http://193.106.55.150:3000","http://cupidoor.cs.colman.ac.il"]

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
				url: "http://193.106.55.149:3000",
			},
		],
	},
	apis: ["./routes/*.js", "./controller/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
  cors({
    origin: (origin,callback)=>{
      if(allowedOrigins.indexOf(origin) > -1){
        callback(null,true);
      }else{
        callback(new Error("Cors ERROR!"));
      }
    },
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

  const server = app.listen(process.env.PORT, () => {
    console.log(chalk.green(`\nServer listening on port: ${PORT}\n`));
  });
  initializeChat(server);
};

startServer();
