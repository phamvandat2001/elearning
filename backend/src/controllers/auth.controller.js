module.exports = (app) => {
    const jwt = require('jsonwebtoken');

    app.post('/login', async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await app.model.user.findOne({ email });
            if (!user) {
                return res.send({ message: `Email ${email} has not been registered!` });
            }
            const isCorrectPassword = app.bcrypt.compare(password, user.password);
            if (!isCorrectPassword) {
                return res.send({ message: `Password is not correct!` });
            }
            
        } catch (error) {
            console.error('POST /login', error);
            res.status(500).send({ message: 'Internal system error!' });
        }
    });

    app.post('/signup', async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const isExist = await app.model.user.findOne({ email });
            if (isExist) {
                return res.send({ message: `Email ${email} is already registered!` });
            }
            const newUser = await app.model.user.create({
                name,
                email: email.toLowerCase(),
                password: app.bcrypt.hash(password)
            });
            await app.nodemailer.send({
                to: [email],
                title: 'Thank you letter!',
                html: `<h1>Cảm ơn bạn đã đăng ký!</h1>
                <p>Xin chào,</p>
                <p>Cảm ơn bạn đã đăng ký tài khoản với chúng tôi. Chúng tôi đánh giá cao sự quan tâm của bạn.</p>
                <p>Nếu bạn có bất kỳ câu hỏi nào hoặc cần sự trợ giúp, đừng ngần ngại liên hệ với chúng tôi.</p>
                <p>Xin cảm ơn!</p>`
            });
            return res.status(200).send({
                message: 'Successful!',
                data: newUser
            });
        } catch (error) {
            console.error('POST /signup', error);
            res.status(500).send({ message: 'Internal system error!' });
        }
    });
}