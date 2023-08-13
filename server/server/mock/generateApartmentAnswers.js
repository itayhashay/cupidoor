const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const chalk = require("chalk");
const ApartmentAnswer = require("../model/apartmentAnswer.model");
const ApartmentModel = require("../model/apartment.model");
const QuestionModel = require("../model/question.model");
require("dotenv").config({ path: "../.env" });
const randomizeInteger = (min, max) => {
  const randomValue = Math.random();
  const scaledValue = randomValue * (max - min + 1);
  const randomInteger = Math.floor(scaledValue) + min;
  return randomInteger;
};

const bootstrap = async () => {
  console.log(chalk.yellow("\nTrying to connect to mongoDB"));
  await mongoose.connect(process.env.MONGOURI);
  console.log(chalk.green("MongoDB connected successfully"));



  const apartments = await ApartmentModel.find().exec();
  const questions = await QuestionModel.find().exec();

  for (let apartment of apartments) {
    for(let question of questions){
      const answer = randomizeInteger(0,1);
      const priority = randomizeInteger(0,5);
      await ApartmentAnswer.create({apartment:apartment._id,question:question._id,answer,priority}
        );
    }

    console.log("Success!");
  }
};


bootstrap();