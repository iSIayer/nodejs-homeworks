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
router.post("/login", validation(loginJoiSchema), ctrlWrapper(ctrl.login));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.post("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));

router.patch("/users/avatars", auth, ctrlWrapper(ctrl.updateAvatar));

module.exports = router;
