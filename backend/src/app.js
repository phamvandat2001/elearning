const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const startApp = async () => {
    try {
        const mode = process.argv[3] || 'production';
        const appConfig = require(path.resolve(__dirname, `../config/${mode}.json`));

        const { port, postgres: postgresConfig, redis: redisConfig, sessionSecret, jwtSecret } = appConfig;
        const app = express();

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use(helmet());
        app.use(compression());

        await require('./database/redis.database')(app, { ...redisConfig, sessionSecret });
        await require('./database/postgres.database')(app, postgresConfig);

        require('./modules/index')(app);
        require('./utils/jwt')(app, jwtSecret);

        app.listen(port, () => {
            console.log(`- App is running on port ${port}!`);
        });
    } catch (error) {
        console.error('- App starts failed:', error);
    }
};

startApp();