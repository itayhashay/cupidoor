const mongoose = require("mongoose");
const chalk = require("chalk");
const UserModel = require("../model/user.model");
require("dotenv").config({ path: "../.env" });

const bootstrap = async () => {
  console.log(chalk.yellow("\nTrying to connect to mongoDB"));
  await mongoose.connect(process.env.MONGOURI);
  console.log(chalk.green("MongoDB connected successfully"));

  const users = await UserModel.find();
  for (let user of users) {
    console.log(chalk.green("Updating " + user.firstName));
    user.markModified("firstName");
    user.markModified("lastName");
    try {
      await user.save();
    } catch (ex) {
        continue;
    }
  }
};

bootstrap();
