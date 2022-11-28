const router = require("express").Router();
const Sequelize = require("sequelize");
const User = require("../db/models/User");
const { requireToken } = require("./gatekeepingMiddleware");

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    console.log(req.body)
    res.json(users);
  } catch (err) {
    next(err);
  }
});

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
          "username",
          "password",
        ],
      });
      res.send({ rows, count });
    } else {
      const { rows, count } = await User.findAndCountAll({
        attributes: [
          "id",
          "firstName",
          "lastName",
          "username",
          "password",
        ],
      });
      res.send({ rows, count });
    }
  } catch (error) {
    next(error);
  }
});

//admin view a single user account
router.get("/all/:id", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

//admin can create new user accounts
router.post("/all", requireToken, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName, username, password,

      isAdmin,
    } = req.body;
    const user = await User.create({
      firstName,
      lastName, username, password,

      isAdmin,
    });
    res.send(user);
  } catch (error) {
    //general check to see if username/email already exists
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(error);
    }
  }
});

//admin can edit existing user accounts
router.put("/all/:id", requireToken, async (req, res, next) => {
  try {
    //gave admins the ability to set other admins
    const {
      firstName,
      lastName, username, password,

      isAdmin,
    } = req.body;
    const userToUpdate = await User.findByPk(req.params.id);
    const editedUser = await userToUpdate.update({
      firstName,
      lastName, username, password,

      isAdmin,
    });
    res.send(editedUser);
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
