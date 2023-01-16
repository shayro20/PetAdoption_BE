const express = require("express");
const userController = require("../controllers/userControler");
const {authAdmin, auth} = require("../tokenmiddelware/tokengen");
const validate = require("../validate/validate");
const {editUserSchema} = require("../schema/userSchema");

const router = express.Router();

router.get("/", authAdmin, userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", auth, userController.updateUser);

// router.get("/:id:full");---- no need for that api i called it from a diffferent way

module.exports = router;
