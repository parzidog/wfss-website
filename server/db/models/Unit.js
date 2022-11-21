const Sequelize = require("sequelize");
const db = require("../db");

const Unit = db.define("unit", {
  length: {
    type: Sequelize.FLOAT(1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  width: {
    type: Sequelize.FLOAT(1),
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
  climate: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Unit;