module.exports = (app) => {
  app.get("/api/users", async (req, res) => {
    try {
      const users = await app.model.users.findAll();
      res.status(200).send({
        message: 'success',
        data: users
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Internal server error!',
      });
    }
  });
};