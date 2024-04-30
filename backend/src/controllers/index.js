module.exports = (app) => {
  const controllers = app.fs.readdirSync('src/controllers').filter((name) => name.endsWith('.controller.js'));
  for (const controllerName of controllers) {
    require(app.path.join(__dirname, controllerName))(app);
  }
  console.log('- Load all controllers successful!');
};