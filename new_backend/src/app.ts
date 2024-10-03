import express, { Express } from 'express';
import * as path from 'path';
import instance, { db } from './database/postgres.provider';
import { loadEnvFile } from 'process';

loadEnvFile(path.join(process.cwd(), '/.env'));

const bootstrap = async () => {
    const app: Express = express();
    const { PORT, NODE_ENV = 'production' } = process.env;
    const port = parseInt(PORT || '3000');

    try {
        app.use(express.json({ limit: '10mb' }));
        // TODO: init database and load models
        await instance.init();
        // TODO: load controllers
        console.log(await db.users.findAll());

        // TODO: load services (optional)
        app.listen(port, () => {
            console.log(`- [${NODE_ENV}]: App is running on port ${port}!`);
        });
    } catch (error) {
        console.error(`- [${NODE_ENV}]: App starts failed!`, error);
        process.exit(1);
    }
};

bootstrap();