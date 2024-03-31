module.exports = (app) => {
  const { promises, ...fse } = require("fs-extra");
  app.fs = {
    ...promises,
    ...fse
  };
};