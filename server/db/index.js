const db = require("./db");
const User = require("./models/User");
const Unit = require("./models/Unit");
const seedFunc = require("./seed");

module.exports = {
  db,
  User,
  Unit,
  seedFunc,
};
