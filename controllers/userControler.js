const bcrypt = require("bcrypt");
const {newUser, checkMail} = require("../models/userModel");
const {tokenGenerator} = require("../tokenmiddelware/tokengen");

async function signUp(req, res) {
  console.log(req.body);
  const user = await checkMail(req);
  console.log(user);
  if (user.length === 0) {
    try {
      req.body.isAdmin = false;
      const result = await newUser(req, res);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(400).send("??");
  }
}

async function login(req, res) {
  console.log("Login");
  const {password, user} = req.body;
  bcrypt.compare(password, user[0].password, (err, result) => {
    if (err) {
      console.log("crypt error", err);
      res.status(500).send(err);
    } else if (!result) {
      res.status(400).res.send("??");
    } else {
      try {
        const token = tokenGenerator(req);
        if (!token) {
          res.status(500).send("problem with token");
        } else {console.log("success")
          res.cookie("token", token, {maxAge: 1000 * 7200, httponly: true});
          res
            .status(200)
            .send({ok: true, userId: user[0].userId, isAdmin: user[0].isAdmin});
        }
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  });
}

async function verifiedUser(res) {
  res.send({loggedin: true});
}
module.exports = {signUp, login,verifiedUser};
