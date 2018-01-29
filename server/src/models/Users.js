module.exports = (sequelize, dataTypes) =>
  sequelize.define('user', {
    email: {
      type: dataTypes.STRING,
      unique: true
    },
    password: dataTypes.STRING
  }
);
