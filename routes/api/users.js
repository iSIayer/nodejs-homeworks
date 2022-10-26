const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewars");
const { users: ctrl } = require("../../controllers");

const router = express.Router;

router.post("/signup", ctrlWrapper(ctrl.register));
router.post("/login");
router.post("/logout");
router.post("/current");

module.exports = router;
