const express = require("express");
const {v4: uuid} = require("uuid");

const router = express.Router();

router.get("/")

router.get("/user/:id")

router.put("/user/:id")

router.get("/user/:id:full")


module.exports = router;
