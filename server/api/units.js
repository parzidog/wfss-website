const router = require("express").Router();
const { Unit } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const units = await Unit.findAll();
    res.send(units);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { length, width, climate, price } = req.body;
    const unit = await Unit.findByPk(req.params.id);
    await unit.update({
      length,
      width,
      climate,
      price,
    });
    res.send(unit);
  } catch (error) {
    next(error);
  }
});

module.exports = router;