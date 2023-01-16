const Ajv = require("ajv");
const ajv = new Ajv({allErrors: true});

const schema = {
  type: "object",
  properties: {
    type: {type: "string"},
    adoptionStatus: {
      type: "string",
    },
    picture: {type: "string"},
    name: {type: "string"},
    breed: {type: "string"},
    color: {type: "string"},
    height: {type: "number"},
    weight: {type: "number"},
    bio: {type: "string"},
    hypoallergenic: {type: "boolean"},
    diet: {type: "string"},
  },

  additionalProperties: false,
};


module.exports = schema;
