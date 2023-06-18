const chalk = require("chalk");
const errorHandler = async function (error, req, res, next) {
  console.error(chalk.red(error.stack));

  if (error.name === "ValidationError") {
    error.message = error.message.split(":")[2];
    return res.status(400).json({ success: false, error: error.message });
  }
  //Handle mongo errors
  if (error.name === "MongoServerError" && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate key error
    const value = error.keyValue[field]; // Get the value that caused the duplicate key error
    // Create a custom error message
    const errorMessage = `${field}: ${value} already exists.`;

    // Set the custom error message
    error.message = errorMessage;
    return res.status(400).json({ success: false, error: error.message });
  }

  res
    .status(error.status || 500)
    .json({ success: false, error: error.message });
};

module.exports = errorHandler;
