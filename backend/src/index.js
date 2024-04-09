module.exports = async (debug) => {
  const Express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const helmet = require("helmet");
  const setRateLimit = require("express-rate-limit");
  const app = Express();

  require("dotenv").config({ path: debug ? "../.env" : "../.env.production" });
  
  app.use(Express.json());
  app.use(bodyParser.urlencoded({ 
    limit: "100mb", 
    extended: true,
  }));
  // app.use(cors({
  //   origin: "*",
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // }));
  app.use(helmet());
  app.use(setRateLimit({
    windowMs: 60*1000,
    max: 20,
    message: "You have exceeded your 20 requests per minute limit!",
    headers: true,
  }));
  
  // Add this line if you're using proxy i.e. nginx
  app.set("trust proxy", 1);  

  // Import all custom libs
  require("./lib/fs")(app);
  require("./lib/lodash")(app);
  require("./lib/bcrypt")(app);
  
  // Connect to database
  await require("./database/postgres")(app);
  await require("./database/redis")(app);

  // Apply necessary middlewares. Ex: app.use(...)
  require("./middlewares/index")(app);

  // Controllers
  require("./controllers/index")(app);

  // console.log(app);
  const PORT = process.env.PORT ?? 8000;
  app.listen(PORT, () => console.log(`- App is running on port ${PORT}!`));
};