module.exports = (app, secret) => {
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");

    app.jwt = {
        generateToken: (payload) => {},
        verify: (token) => {},
    };

    app.bcrypt = {
        hash: (pwd) => bcrypt.hashSync(),
        compare: (pwd1, pwd2) => {},
    };
};
