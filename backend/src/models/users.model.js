module.exports = async (app, sequelize) => {
  const { DataTypes } = require("sequelize");

  const userModel = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    last_name: {
      type: DataTypes.STRING(100)
    },
    first_name: {
      type: DataTypes.STRING(500)
    },
    email: {
      type: DataTypes.STRING(200)
    },
    password: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false,
  });

  await userModel.sync();

  app.model.users = userModel;
}