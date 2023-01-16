const bcrypt = require("bcrypt");
const {
  newUser,
  checkMail,
  allUsers,
  getUser,
  updateUserModel,
  checkPhone,
} = require("../models/userModel");
const {
  getSavedPetsByUserId,
  getOwnedPetsByUserId,
} = require("../models/petModels");
const {tokenGenerator} = require("../tokenmiddelware/tokengen");
// const {getOwnedPetsByUser} = require("../models/petModels");

async function updateUser(req, res) {
  console.log(req.body);
  const user = await checkMail(req);
  if (user.length === 0) {
    if (user.phone) {
      const userPhone = await checkPhone(req);
      console.log("USERpHONE", userPhone);
      if (userPhone.length === 0) {
        try {
          const result = await updateUserModel(req);
          res.send("done");
        } catch (error) {
          console.log(error);
          res.status(500).send(error);
        }
      } else {
        console.log("error for phone");
        return res.status(400).send("error");
      }
    } else {
      const result = await updateUserModel(req);
      res.send("done");
    }
  } else {
    console.log("error for mail");
    return res.status(400).send("error");
  }
}

async function getUserById(req, res) {
  console.log(req.params);
  try {
    const result = await getUser(req);
    if (res.length === 0) {
      res.status(500).send(error);
    } else {
      res.send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

async function signUp(req, res) {
  console.log(req.body);
  const user = await checkMail(req);
  if (user.length === 0) {
    const userPhone = await checkPhone(req);
    console.log(userPhone);
    if (userPhone.length === 0) {
      try {
        req.body.isAdmin = false;
        const result = await newUser(req, res);
        res.send(result);
      } catch (error) {
        console.log(error);
        return res.status(400).send("error");
      }
    } else {
      console.log("error for phone");
      return res.status(400).send("error");
    }
  } else {
    console.log("error for mail");
    return res.status(400).send("error");
  }
}

async function login(req, res) {
  console.log("Login", req.body);
  const {password, user} = req.body;
  console.log("user", user);
  bcrypt.compare(password, user[0].password, async (err, result) => {
    if (err) {
      console.log("crypt error", err);
      res.status(500).send(err);
    } else if (!result) {
      res.status(400).send("??");
    } else {
      try {
        const savedPets = await getSavedPetsByUserId(user[0].userId);
        const ownedPets = await getOwnedPetsByUserId(user[0].userId);
        const token = await tokenGenerator(req);
        console.log(token);
        if (!token) {
          console.log("not token");
          res.status(500).send("problem with token");
        } else {
          console.log("success");
          res.cookie("token", token, {maxAge: 1000 * 7200, httponly: true});
          res.status(200).send({
            isUser: true,
            id: user[0].userId,
            isAdmin: user[0].isAdmin,
            firstName: user[0].firstName,
            savedPets: savedPets,
            ownedPets: ownedPets,
          });
        }
      } catch (err) {
        console.log(err);
        res.status(500).send(err);
      }
    }
  });
}
async function getAllUsers(req, res) {
  try {
    const result = await allUsers(req, res);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function verifiedUser(req, res) {
  console.log(req.body.id);
  const savedPets = await getSavedPetsByUserId(req.body.id);
  const ownedPets = await getOwnedPetsByUserId(req.body.id);
  console.log(savedPets);
  req.body.savedPets = savedPets;
  req.body.ownedPets = ownedPets;
  console.log("verify", req.body);
  res.send(req.body);
}
module.exports = {
  signUp,
  login,
  verifiedUser,
  getAllUsers,
  updateUser,
  getUserById,
};
