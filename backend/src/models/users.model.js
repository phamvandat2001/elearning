module.exports = async (app, modelName) => {
  const { DataTypes } = require("sequelize");
  try {
    const model = app.database.sequelize.define(modelName, {
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
    });
    await app.database.sequelize.sync({ force: false });
    app.model.users = {...model};
    console.log(app.model.users);
  } catch (error) {
    console.error('- Synchronize model Users failed!');
    throw error;
  }
}