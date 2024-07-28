import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

export default async (app: CustomExpressServer) => {
    try {
        app.use(express.json());
        app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(morgan('dev'));
    
        console.log('- Load all middlewares successful!');
    } catch (error) {
        console.error('- Load all middlewares failed!');
        throw error;
    }
};