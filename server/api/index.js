const router = require("express").Router();

router.use("/units", require("./units"));
router.use("/users", require("./users"));



module.exports = router;