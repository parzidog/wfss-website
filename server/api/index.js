
const router = require("express").Router();

router.get("/", function (req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, "/index.html"))
})

router.use("/users", require("./users"));

router.use("/units", require("./units"));

router.use((req, res, next) => {
  const err = new Error("API route not found!")
  err.status = 404
  next(err)
})

module.exports = router;