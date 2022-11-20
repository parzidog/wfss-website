// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const { db, database } = require("./database")
const Unit = require("./models/unit")
const User = require("./models/user")

const users = [];
const units = [{
  length: 10,
  width: 10,
  price: 84,
  climate: false
}];

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(units.map(unit => Unit.create(unit)));
    await Promise.all(users.map(user => User.create(user)));

    //   await db.close();

    console.log(`Successfully seeded the database named ${database}!`);
  } catch (error) {
    console.error("There was a problem seeding the database", error);
    //   await db.close();
  }
};

module.exports = {
  // Include your models in this exports object as well!
  db,
  syncAndSeed,
  User,
  Unit
}