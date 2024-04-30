module.exports = async (app, mongoose) => {
    app.model = {};
    const models = app.fs.readdirSync(__dirname);
    for (const model of models) {
        if (model != 'index.js') {
            require(app.path.join(__dirname, model))(app, mongoose);
        }
    }
    console.log('- Load all models successful!');
};