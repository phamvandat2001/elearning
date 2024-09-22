module.exports = (app) => {
    const path = require('path');
    const fs = require('fs');
    
    const listModuleName = fs.readdirSync(__dirname).filter(fileName => fileName != 'index.js');
    
    for (const moduleName of listModuleName) {
        // Load controller file 
        const controllerFilePath = path.resolve(__dirname, moduleName, 'controller.js');
        require(controllerFilePath)(app);

        // Load all js file in controller file (if has)
    }

    console.log('- Load all controllers successfully!');
};