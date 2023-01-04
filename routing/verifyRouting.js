const express = require("express");
const router = express.Router();
const {tokenVerify} = require("../tokenmiddelware/tokengen");
const {verifiedUser} = require("../controllers/userControler");

router.get("/", tokenVerify, () => verifiedUser);

module.exports = router;
