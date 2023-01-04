const dbConnection = require("../knex/knex");
const {checkMail} = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function cryptPass(req, res, next) {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      req.body.password = hash;
      next();
    });
  });
}

async function isUserExist(req, res, next) {
  try {
    const user = await checkMail(req);
    console.log("zero");
    if (user.length===0) {
      console.log("first");
      res.status(500).send("no such user");
      return;
    } else {console.log("second")
      req.body.user = user;
      console.log(req.body.user);
      next();
    }
  } catch (error) {}
}





module.exports = {cryptPass, isUserExist};
