module.exports = async (debug) => {
  const Express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const app = Express();

  require("dotenv").config({ path: debug ? "../.env" : "../.env.production" });
  
  app.use(Express.json());
  app.use(bodyParser.urlencoded({ 
    limit: "100mb", 
    extended: true,
  }));
  app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  
  // Add this line if you're using proxy i.e. nginx
  app.set("trust proxy", 1);
  
  // Apply necessary middlewares. Ex: app.use(...)
  

  // Import all custom libs
  require("./lib/fs")(app);
  require("./lib/lodash")(app);
  
  // Connect to database
  await require("./database/postgres")(app);
  await require("./database/redis")(app);

  // console.log(app);
  const PORT = process.env.PORT ?? 8000;
  app.listen(PORT, () => console.log(`- App is running on port ${PORT}!`));
};