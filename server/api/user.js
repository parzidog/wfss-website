const router = require("express").Router();
const Sequelize = require("sequelize");
const { User } = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");

//USER ACCOUNT ROUTES
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userData = { username: username, password: password };
    let user = await User.authenticate(userData);
    res.send({ token: await user.generateToken() });
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const { firstName, lastName, username, password } =
      req.body;
    const user = await User.create({
      firstName,
      lastName,
      username,
      password,
    });
    res.send({ token: await user.generateToken() });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(error);
    }
  }
});

//user can view their own profile
router.get("/me", requireToken, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
    } = req.user;
    const userInfo = {
      firstName,
      lastName,
      username,
      password,
    };
    res.send(userInfo);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//user can edit their own profile
router.put("/edit", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    const { firstName, lastName, username, password } =
      req.body;
    const updatedUser = await user.update({
      firstName,
      lastName,
      username,
      password,
    });
    res.send(updatedUser);
  } catch (error) {
    next(error);
  }
});

//checks to see if whatever input is passed into req.params exists
//req.body.value will be sent from the front end
router.post("/userExists/:input", async (req, res, next) => {
  try {
    const field = req.params.input;

    const user = await User.findOne({
      where: { [field]: req.body.value },
    });
    if (user) {
      res.send({ field, isAvailable: false });
    } else {
      res.send({ field, isAvailable: true });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});



//ADMIN ROUTES for users
//admin view all user accounts
router.get("/all", requireToken, async (req, res, next) => {
  try {
    if (req.query.page) {
      const orderArr =
        req.query.sort === "true"
          ? [Sequelize.fn("lower", Sequelize.col("lastName")), "asc"]
          : ["id", "asc"];
      const { rows, count } = await User.findAndCountAll({
        order: [orderArr],
        offset: (req.query.page - 1) * 25,
        limit: 25,
        attributes: [
          "id",
          "firstName",
          "lastName",
          "gender",
          "phoneNum",
          "username",
          "password",
          "email",
          "isAdmin",
        ],
      });
      res.send({ rows, count });
    } else {
      const { rows, count } = await User.findAndCountAll({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "gender",
          "phoneNum",
          "username",
          "password",
          "email",
          "isAdmin",
        ],
      });
      res.send({ rows, count });
    }
  } catch (error) {
    next(error);
  }
});

//admin can remove user accounts
router.delete("/all/:id", requireToken, async (req, res, next) => {
  try {
    const userToDelete = await User.findByPk(req.params.id);
    await userToDelete.destroy();
    res.send(userToDelete);
  } catch (error) {
    next(error);
  }
});

module.exports = router;