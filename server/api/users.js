const router = require("express").Router();
const { User } = require("../db/models");

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    res.send(await User.create(req.body))
  }
  catch (error) {
    console.log(error)
  }
})

// GET /api/users/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:userId
router.delete("/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.destroy();
    res.send(user);
  }
  catch (error) {
    console.log(error)
  }
})

// PUT /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (error) {
    next(error);
  }
});


module.exports = router;