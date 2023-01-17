const jwt = require("jsonwebtoken");

async function tokenGenerator(req) {
  const obj = req.body.user;
  console.log(obj[0]);
  console.log("req");
  const token = jwt.sign(
    {
      id: obj[0].userId,
      isAdmin: obj[0].isAdmin,
      firstName: obj[0].firstName,
      phone: obj[0].phone,
    },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  return token;
}

async function auth(req, res, next) {
  console.log("check");
  if (!req.cookies.token) {
    return res.status(401).send("Unauthorized");
  }

  const token = req.cookies.token;
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    console.log("token", req.cookies.token);
    console.log(decoded);
    if (err) {
      return res.status(400).send("Not Approved");
    } else if (!decoded) {
      return res.clearCookie("token"), res.status(401).send("Not Approved");
    } else if (decoded.id) {
      if (Object.keys(req.params).length !== 0) {
        console.log(req.params, "whattttt");
        req.body.id = decoded.id;
        next();
      } else {
        req.body.id = decoded.id;
        req.body.isAdmin = decoded.isAdmin;
        req.body.isUser = true;
        req.body.phone = decoded.phone;
        req.body.firstName = decoded.firstName;
        next();
      }
      return;
    }
    return res.status(401).send(err);
  });
}

async function authAdmin(req, res, next) {
  console.log(req.cookies);
  console.log("check");

  if (!req.cookies.token) {
    console.log("what???");
    return res.status(401).send("Unauthorized");
  }

  const token = req.cookies.token;
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    console.log("token", req.cookies.token);
    if (err) {
      return res.status(400).send("Not Approved");
    } else if (!decoded) {
      return res.status(400).send("Not Approved");
    } else if (decoded.isAdmin == 1) {
      req.body.id = decoded.id;
      req.body.isAdmin = decoded.isAdmin;
      req.body.isUser = true;
      req.body.phone = decoded.phone;
      req.body.firstName = decoded.firstName;
      console.log("user is admin");
      next();
    }
  });
}

module.exports = {tokenGenerator, auth, authAdmin};
