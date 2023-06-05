const chalk = require("chalk");
const errorHandler = async function (error, req, res, next) {
  console.error(chalk.red(error.stack));

  next();
};

module.exports = errorHandler;
