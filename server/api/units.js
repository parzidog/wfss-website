const router = require("express").Router();
const { Unit } = require("../db")


// GET /api/units
router.get("/", async (req, res, next) => {
  try {
    const units = await Unit.findAll()
    console.log("db units", units)
    res.send(units)
  } catch (error) {
    next(error)
  }
})

// GET /api/units/:id
router.get("/:id", async (req, res, next) => {
  try {
    const unit = await Unit.findByPk(req.params.id)
    res.send(unit)
  } catch (error) {
    next(error)
  }
})

//POST /api/units
router.post("/", async (req, res, next) => {
  try {
    const unit = await Unit.create(req.body)
    res.status(201).send(unit)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/units/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const unit = await Unit.findByPk(req.params.id)
    await unit.destroy()
    res.send(unit)
  } catch (error) {
    next(error)
  }
})

//PUT /api/units/:id
router.put("/:id", async (req, res, next) => {
  try {
    const unit = await Unit.findByPk(req.params.id);
    unit.update(req.body)
    res.send(unit)
  } catch (error) {
    next(error)
  }
})

module.exports = router