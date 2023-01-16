const express = require("express");
require("dotenv").config;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./knex/knex");
const petsPath = require("./routing/petsRouting");
const userPath = require("./routing/userRouting");
const loginPath = require("./routing/loginRouting");
const signupPath = require("./routing/signupRouting");
const verifyPath = require("./routing/verifyRouting");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ["http://localhost:3000"], credentials: true}));

// app.use("/*")

app.use("/pets", petsPath);
app.use("/user", userPath);
app.use("/signup", signupPath);
app.use("/login", loginPath);
app.use("/verify", verifyPath);

// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(err.statusCode).send(err.message);
// });

dbConnection.migrate
  .latest()
  .then((migration) => {
    console.log(migration);
    if (migration) {
      console.log("connected to DB :)", migration);
      app.listen(PORT, () => {
        console.log(`Listing on ${[PORT]}`);
      });
    }
  })
  .catch((err) => process.exit(1));
