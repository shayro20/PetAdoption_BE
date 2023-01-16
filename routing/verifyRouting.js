const express = require("express");
const router = express.Router();
const {auth} = require("../tokenmiddelware/tokengen");
const {verifiedUser} = require("../controllers/userControler");

router.get("/", auth, verifiedUser);

module.exports = router;
