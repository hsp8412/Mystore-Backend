const { rest } = require("lodash");

//error handling middleware
module.exports = function (error, req, res, next) {
  //log the exception
  res.status(500).send("Something failed.");
};
