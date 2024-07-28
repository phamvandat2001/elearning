import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';

const loadSchemas = (app: CustomExpressServer) => {
    const modelsPath = path.join(process.cwd(), "src", "models");
    if (fs.existsSync(modelsPath)) {
        app.schema = {};
    } else {
        throw new Error(`- Not found models path: ${modelsPath}!`);
    }
};

const connectDB = async (app: CustomExpressServer) => {
    const dbConfig = {
        host: "cluster0.lakieqt.mongodb.net",
        userName: "elearning-dev",
        password: "iTpg7pkSINxbe3hAWPVjCNWp5MF5i1Cfdv3QUArY4oM",
        database: "development",
    };
    const connectionUri = `mongodb+srv://${dbConfig.userName}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}`;

    await mongoose.connect(connectionUri, { retryWrites: true })
    .then(() => {
        loadSchemas(app);
        console.log("- Connect to MongoDB successful!");
    })
    .catch((error) => {
        console.error("- Connect to MongoDB failed!");
        throw error;
    });
};

export default connectDB;