const express = require("express");
require("dotenv").config;
const cors = require("cors");
const petsPath = require("./routing/petsRouting");
const userPath = require("./routing/userRouting");
const loginPath = require("./routing/loginRouting");
const signupPath = require("./routing/signupRouting");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/pets", petsPath);
app.use("/user", userPath);
app.use("/signup", signupPath);
app.use("/login", loginPath);

app.listen(PORT, () => {
  console.log(`Listing on ${[PORT]}`);
});
