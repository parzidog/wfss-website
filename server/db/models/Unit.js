const Sequelize = require("sequelize");
const { db } = require("../db");
require("dotenv").config();

const Unit = db.define("unit", {
  length: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  width: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    climate: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
});

module.exports = Unit;
