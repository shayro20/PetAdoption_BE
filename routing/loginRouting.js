const express = require("express");
const {v4: uuid} = require("uuid");
const router = express.Router();
const userController = require("../controllers/userControler");
const validateBody = require("../validate/validate");
const {loginSchema} = require("../schema/userSchema");
const {isUserExist} = require("../middleware/userMid");

router.post("/", validateBody(loginSchema), isUserExist, userController.login);

router.get("/signout", (req, res) => {
  res.clearCookie("token");
  res.send("done");
});

module.exports = router;
