const db = require("../db");
const users = require("./userSeed");
const User = require("../models/User");
const units = require("./unitSeed");
const Unit = require("../models/Unit");

const seed = async () => {
  console.log("Seeding in progress...");
  await db.sync({ force: true });
  await Promise.all(users.map((user) => User.create(user)));
  await Promise.all(units.map((unit) => Unit.create(unit)));
  console.log("Seeding complete!");
};

module.exports = seed;
