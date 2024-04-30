module.exports = async (app) => {
    const mongoose = require('mongoose');

    const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME, MONGO_HOST } = process.env;

    try {
        await mongoose.connect(`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}`);
        console.log('- Connect to MongoDB successful!');
        await require('../models/index')(app, mongoose);
    } catch (error) {
        console.error('- Connect to MongoDB failed!', error);
    }
};