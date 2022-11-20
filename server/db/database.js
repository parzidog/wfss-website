const Sequelize = require("sequelize");
const database = "template"
const db = new Sequelize(`postgres://localhost:5432/${database}`, { logging: false });

module.exports = {
  db,
  database
}

//do not touch!!!