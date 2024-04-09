module.exports = async (app) => {
  require("dotenv").config();

  const { Sequelize, DataTypes } = require("sequelize");
  const { DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = process.env;
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    retry: {
      timeout: 30000
    },
    logging: false,
  });

  try {
    await sequelize.authenticate();
    app.database = {
      sequelize,
      DataTypes
    };
    app.model = {};
    const modelNames = app.fs.readdirSync(app.path.join("src/models"));
    for (const modelName of modelNames) {
      await require(`../models/${modelName}`)(app, sequelize);
    }

    console.log(`- Connect to PostgreSQL database successful!`);
  } catch (error) {
    console.error("- Connect to PostgreSQL database fail!");
    throw error;
  }
};