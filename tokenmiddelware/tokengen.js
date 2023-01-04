const jwt = require("jsonwebtoken");

async function tokenGenerator(req) {
  const obj = req.body;
  const token = jwt.sign({id: obj.id,...obj}, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  return token;
}

async function tokenVerify(req, res, next) {
  if (!req.cookies.token) {
    res.status(401).send("Unauthorized");
    return;
  }

  const token = req.cookies.token;
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.status(400).send("Not Approved");
    } else if (!decoded) {
      res.status(400).send("Not Approved");
    } else {
      next();
    }
    if (decoded) {
      req.cody.userId = decoded.id;
      next();
      return;
    }
  });
}

module.exports = {tokenGenerator, tokenVerify};
