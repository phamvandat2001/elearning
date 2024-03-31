module.exports = async (app) => {
  require("dotenv").config();

  const { Sequelize, Op, DataTypes } = require("sequelize");
  const { DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = process.env;
  const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    retry: {
      timeout: 30000
    },
    dialect: 'postgres',
    logging: true,
  });

  try {
    await sequelize.authenticate();

    if (!app.database) app.database = {};
    app.database.postgres = {
      Op,
      DataTypes
    };

    console.log(`- Connect to PostgreSQL database successful!`);
  } catch (error) {
    console.error("- Connect to PostgreSQL database fail!");
    throw error;
  }
};