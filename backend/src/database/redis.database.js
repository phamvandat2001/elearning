module.exports = async (app, config) => {
    const { createClient } = require('redis');
    const session = require('express-session');
    const RedisStore = require('connect-redis').default;
    const { host, port, sessionSecret } = config;
    
    const client = await createClient({
        url: `redis://${host}:${port}`
    });

    client.on("error", (err) => {
        throw new Error("- Unable to connect Redis: ", error);
    });

    app.use(session({
        store: new RedisStore({ client }),
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 0,
        },
    }));
    app.redis = client;

    console.log("- Connect to Redis successfully!");
}