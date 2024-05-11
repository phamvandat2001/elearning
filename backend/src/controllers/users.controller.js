module.exports = (app) => {
  app.get('/api/user', async (req, res) => {
    try {
      const items = await app.model.user.find({});
      res.send({items});
    } catch (error) {
      console.error(error);
      res.send({ error: 'Internal system error!' });
    }
  });

  app.post('/api/user', async (req, res) => {
    try {
      const { email, password } = req.body;
    } catch (error) {
      console.error(error);
      res.send({ error: 'Internal system error!' });
    }
  });

  app.put('/api/user', async (req, res) => {
    
  });

  app.delete('/api/user', async (req, res) => {

  });
};