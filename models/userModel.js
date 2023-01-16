const dbConnection = require("../knex/knex");
const tokenVerify = require("../tokenmiddelware/tokengen");

async function newUser(req, res) {
  try {
    console.log("new user creating");
    const create = await dbConnection.from("users").insert({
      ...req.body,
    });
    return create;
  } catch (error) {
    console.log(error);
  }
}
async function getUser(req, res) {
  const id = req.params.id;
  console.log(id)
  try {
    console.log("gett user");
    const user = await dbConnection.from("users").where("userId", id);
    const {password, ...restUser} = user[0];

    return restUser;
  } catch (error) {
    console.log(error);
  }
}

async function checkMail(req) {
  console.log("mail checking",req.body.email);
  const check = await dbConnection.from("users").where("email", req.body.email);
  console.log(check, "check");
  return check;
}
async function allUsers(req, res) {
  const id = req.body.id;
  console.log("getting users");
  try {
    const result = await dbConnection.from("users");
    const fixedResult = result.map((item) => {
      const {password, ...r} = item;
      return r;
    });
    return fixedResult;
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
async function updateUserModel(req) {
  try {
    const {id} = req.params;
    const data = req.body;
    return await dbConnection.from("users").where("userId", id).update(data);
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
}
async function checkPhone(req) {
  const check = await dbConnection.from("users").where("phone", req.body.phone);
  console.log(check, "check");
  return check;
}

module.exports = {
  newUser,
  checkMail,
  allUsers,
  getUser,
  updateUserModel,
  checkPhone,
};
