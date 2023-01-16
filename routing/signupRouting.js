const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControler");
const validateBody = require("../validate/validate");
const {signUpSchema} = require("../schema/userSchema");

const {cryptPass} = require("../middleware/userMid");

router.post("/", validateBody(signUpSchema), cryptPass, (req, res) =>
  userController.signUp(req, res)
);

module.exports = router;
