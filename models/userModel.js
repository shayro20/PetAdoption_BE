const dbConnection = require("../knex/knex");
const tokenVerify=require("../tokenmiddelware/tokengen")

async function newUser(req, res) {
  try {console.log("new user creating")
    const create = await dbConnection.from("users").insert({
      ...req.body,
    });
    return create;
  } catch (error) {
    console.log(error);
  }
}

async function checkMail(req) {
  console.log("mail checking");
  const check = await dbConnection.from("users").where("email", req.body.email);
  console.log(check,"check")
  return check;
}





module.exports = {newUser, checkMail};
