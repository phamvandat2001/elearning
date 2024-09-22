module.exports = (app) => {
    const apiPath = `/api/${__dirname.split('/').at(-1)}`;
    
    app.get(`${apiPath}/`, async (req, res) => {
        try {
            const items = await app.model.users.findAll({});
            res.status(200).send({
                message: "Get all users successful!",
                data: items,
            })
        } catch (error) {
            console.error(`GET ${apiPath} error:`, error);
            res.status(500).send({
                error: "Internal system error!",
            });
        }
    });

    app.get(`${apiPath}/with-filter`, async (req, res) => {
        try {
            const { pageNumber = 1, pageSize = 50 } = req.query;
            const filter = {
                pageNumber: parseInt(pageNumber),
                pageSize: parseInt(pageSize),
            };
            const items = await app.model.users.findAllWithFilter(filter);
            res.status(200).send({
                message: "Get all users successful!",
                data: items,
            })
        } catch (error) {
            console.error("GET /api/users/with-filter error:", error);
            res.status(500).send({
                error: "Internal system error!",
            });
        }
    });
    
    app.post(`${apiPath}/`, async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;
            const item = await app.model.users.create({ firstName, lastName, email, password });
            res.status(200).send({
                message: "Create user successful!",
                data: item,
            });
        } catch (error) {
            console.error("POST /api/users error:", error);
            res.status(500).send({
                error: "Internal system error!",
            });
        }
    });

    app.put(`${apiPath}/:id`, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const { firstName, lastName, email, password } = req.body;

            const user = await app.model.user.findById(id);
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (email) user.email = email;
            if (password) user.password = password;

            await user.save();

            res.status(200).send({
                message: "Update user successful!",
                data: user,
            })
        } catch (error) {
            console.error(`PUT /api/users/${id} error:`, error);
            res.status(500).send({
                error: "Internal system error!",
            });
        }
    });

    app.delete(`${apiPath}/:id`, async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const deleteUser = await app.model.user.destroy({
                where: { id },
                return: true,
            });
            if (!deleteUser) {
                res.status(400).send({ error: "Not found user!"});
                return;
            }
            res.status(200).send({
                message: "Delete user successful!",
                data: user,
            });
        } catch (error) {
            console.error(`DELETE /api/users/${id} error:`, error);
            res.status(500).send({
                error: "Internal system error!",
            });
        }
    });
}