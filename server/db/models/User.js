const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT_ROUNDS = 10;

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    set(value) {
      this.setDataValue("username", value.toLowerCase());
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

//authentication class/instance methods

//creates token for the user instance
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

//checks the passed in credentials, will return the user if credentials are valid
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });

  //if the user or the comparison between hashed and passed in password is falsey
  if (!user) {
    const error = Error(" Invalid Username ");
    error.status = 401;
    throw error;
  } else if (!(await bcrypt.compare(password, user.password))) {
    const error = Error("Incorrect password");
    error.status = 401;
    throw error;
  }
  return user;
};

//searches for user by passed in token (will return the user if they exist)
User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = await User.findByPk(id);
    if (!user) {
      const error = Error("User does not exist");
      throw error;
    }
    return user;
  } catch (err) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

//hooks to hash password whenever a new user has been created/existing user has been updated
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  user.password = hashedPassword;
});

module.exports = User;
