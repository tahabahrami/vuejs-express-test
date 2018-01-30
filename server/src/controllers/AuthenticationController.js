const { User } = require("../models");
module.exports = {
  async register(req, res) {
    try {
      const user = await User.create(req.body);
      res.send(user.toJSON());
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
    // res.send({
    //     message : `hello ${req.body.password}! your user was registered!`
    // })
  }
};
