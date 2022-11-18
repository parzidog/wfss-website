const Sequelize = require("sequelize");
const database = "template";

const config = {
  logging: false,
};

if (process.env.DATABASE_URL) {
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/${database}`,
  config
);

module.exports = {
  db,
  database,
};
