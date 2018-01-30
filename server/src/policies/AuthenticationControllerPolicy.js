const joi = require("joi");

module.exports = {
  register(req, res, next) {
    const schema = {
      email: joi.string().email(),
      password: joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}"))
    };

    const { error, value } = joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res.status(400).send({
            error: "You must provide a valid email address"
          });
          break;
        case "password":
          res.status(400).send({
            error:
              "You must password length is shorter than 8 or bigger than 32 or contain special characters like %"
          });
          break;

        default:
          res.status(400).send({
            error: "invalid registeration information"
          });
          break;
      }
    } else {
      next();
    }
  }
};
