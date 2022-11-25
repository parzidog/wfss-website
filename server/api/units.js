const router = require("express").Router();
const Unit = require("../db/models/Unit");

// GET /api/units
router.get("/", async (req, res, next) => {
  try {
    const units = await Unit.findAll();
    console.log("UNITS: ", units);
    res.json(units);
  } catch (error) {
    next(error);
  }
});

// POST /api/units
router.post("/", async (req, res) => {
  try {
    res.send(await Unit.create(req.body))
  }
  catch (error) {
    console.log(error)
  }
})

// GET /api/units/:unitId
router.get("/:unitId", async (req, res, next) => {
  try {
    const unit = await Unit.findByPk(req.params.unitId);

    res.json(unit);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/units/:unitId
router.delete("/:unitId", async (req, res) => {
  try {
    const unit = await Unit.findByPk(req.params.unitId);
    await unit.destroy();
    res.send(unit);
  }
  catch (error) {
    console.log(error)
  }
})

// PUT /api/units/:id
router.put("/:id", async (req, res, next) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    res.send(await unit.update(req.body));
  } catch (error) {
    next(error);
  }
});


module.exports = router;