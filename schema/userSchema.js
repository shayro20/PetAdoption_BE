const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});
const addFormats = require("ajv-formats");
addFormats(ajv);

const loginSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string"},
  },
  additionalProperties: false,
};

const signUpSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    phone: {type: "string"},
  },

  additionalProperties: false,
};
const editUserSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string"},
    firstName: {type: "string"},
    lastName: {type: "string"},
    phone: {type: "string"},
    bio: {type: "string"},
  },

  additionalProperties: false,
};

module.exports = {loginSchema, signUpSchema, editUserSchema};
