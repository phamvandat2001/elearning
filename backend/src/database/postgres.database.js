const { Sequelize, Error } = require('sequelize');

module.exports = async (app, config) => {
    const { databaseName, username, password, host, port } = config;
    const sequelize = new Sequelize(`postgres://${username}:${password}@${host}:${port}/${databaseName}`, {
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });
    await sequelize.authenticate()
        .then(async () => {
            // sync all models with database
            await sequelize.sync({ force: true });
            console.log('- Connect to Postgres database successfully!');

            // load all models into app
            await require('./models/index')(app, sequelize);
        })
        .catch(error => {
            throw new Error(`- Unable to connect to the Postgres database: ${error}`);
        });
};