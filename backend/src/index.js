module.exports = async (debug) => {
  const Express = require("express");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const helmet = require("helmet");
  const app = Express();
  
  app.use(Express.json());
  app.use(bodyParser.urlencoded({ 
    limit: "100mb", 
    extended: true,
  }));
  app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  app.use(helmet());
  
  // Add this line if you're using proxy i.e. nginx
  app.set("trust proxy", 1);  

  // Import all custom libs
  require("./lib/fs")(app);
  require("./lib/lodash")(app);
  require("./lib/bcrypt")(app);
  require("./lib/nodemailer")(app);
  
  // Connect to database
  // await require("./database/postgres")(app);
  await require('./database/mongo')(app);
  // await require("./database/redis")(app);

  // Apply necessary middlewares. Ex: app.use(...)
  require("./middlewares/logger")(app);

  // Controllers
  require("./controllers/index")(app);

  // console.log(app);
  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`- App is running on port ${PORT}!`));
};