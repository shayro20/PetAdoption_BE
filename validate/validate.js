const Ajv = require("ajv");
const ajv = new Ajv();
const format = require("ajv-formats");
format(ajv);
function validateBody(schema) {
  return (req, res, next) => {
    console.log(req.body)
    const validate = ajv.validate(schema, req.body);
    console.log(validate);
    if (validate) {
      return next();
    } else {
      return res
        .status(400)
        .send("problem with body" + JSON.stringify(ajv.errors[0].message));
    }
  };
}
module.exports = validateBody;
