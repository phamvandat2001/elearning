module.exports = (app, mongoose) => {
    const userModel = new mongoose.Schema({
        name: {
            type: String,
            max: 500,
            trim: true
        },
        email: {
            type: String,
            max: 500
        },
        password: {
            type: String
        },
    });

    app.model.user = mongoose.model('users', userModel);
};