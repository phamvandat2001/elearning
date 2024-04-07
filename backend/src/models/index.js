module.exports = async (app) => {
  app.model = {};
  const models = app.fs.readdirSync('src/models').filter((name) => name.endsWith('.model.js'));
  for (const model of models) {
    const [modelName, ,] = model.split('.');
    const modelPath = app.path.join(__dirname, model);
    await require(modelPath, modelName)(app);
  }
  console.log('- Load all models successful!');
};