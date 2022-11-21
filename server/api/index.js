const router = require("express").Router();

// router.use('/template', require('./template'));
router.use("/users", require("./users"));
router.use("/units", require("./units"));

module.exports = router;
