module.exports = (app) => {
  const { promises, ...fse } = require("fs-extra");
  const path = require("path");
  app.fs = {
    ...promises,
    ...fse
  };
  app.path = { ...path };
};