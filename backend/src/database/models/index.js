const path = require('path');
const fs = require('fs');

module.exports = async (app, sequelize) => {
    const modelsPath = path.resolve(__dirname);
    const files = fs.readdirSync(modelsPath);

    app.model = {};

    for await (const file of files) {
        if (file !== 'index.js') {
            require(path.resolve(modelsPath, file))(app, sequelize);
        }
    }

    console.log('- Load all models successfully!')
};