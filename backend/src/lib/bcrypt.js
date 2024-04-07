module.exports = (app) => {
  const brcypt = require('bcrypt');
  app.bcrypt = {
    hash: (password, saltRounds = 10) => {
      const salt = brcypt.genSaltSync(saltRounds);
      return brcypt.hashSync(password, salt);
    },
    compare: (password, hashPassword) => {
      return brcypt.compareSync(password, hashPassword);
    }
  };
};