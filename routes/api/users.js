const express = require("express");
const router = express.Router();

const { ctrlWrapper, validation, auth } = require("../../middlewars");
const { users: ctrl } = require("../../controllers");
const {
  signupJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("../../models/user");

router.post("/signup", validation(signupJoiSchema), ctrlWrapper(ctrl.register));
router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.register));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/logout", auth, ctrlWrapper(ctrl.register));
router.get("/current", auth, ctrlWrapper(ctrl.register));

module.exports = router;
