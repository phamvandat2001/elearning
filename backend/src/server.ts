/// <reference types="../types/global.d.ts" />
import express from 'express';
import connectDB from './database/mongo.database';
import loadMiddlewares from './config/middleware';

const start = async () => {
    try {
        const app: CustomExpressServer = express();
        
        // load some middlewares
        loadMiddlewares(app);

        // connect to database. If successful, load all models into app.schema
        await connectDB(app);
    
        app.listen(3000, () => {
            console.log("- App's server is starting in port 3000!");
        });
    } catch (error) {
        console.error(error);
        console.error("- App's server starts failed!");
    }
};

start();