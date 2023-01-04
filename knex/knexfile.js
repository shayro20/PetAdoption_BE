const path = require("path");
require("dotenv").config();
const migrationsPath = path.resolve(__dirname, "../migrations");

module.exports = {
  client: "mysql2",
  connection: {
    database: process.env.DB_NAME,
    user: process.env.USER,
    password: process.env.PASS,
    host: "localhost",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: migrationsPath,
  },
};
