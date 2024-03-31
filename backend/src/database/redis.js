module.exports = async (app) => {
  const redis = require("redis");
  const REDIS_SECRET = '6bezADw5hesotnllHQApYSy9aEBcyQ5';
  
  try {
    const client = redis.createClient({
      host: 'localhost',
      port: 6379,
    });

    await client.connect();

    client.on("error", (error) => {
      throw error;
    });

    const session = require("express-session");
    const RedisStore = require("connect-redis").default;

    if (!app.database) app.database = {};
    app.database.redis = { ...client };

    app.use(session({
      store: new RedisStore({ client }),
      secret: REDIS_SECRET,
      resave: false,
      saveUninitialized: false,
    }));

    console.log('- Connect to Redis database successful!');
  } catch (error) {
    console.error('- Connect to Redis database fail!', error);
  }
}