const debug = !__dirname.startsWith('/var/www');
require("./src/index")(debug);