module.exports = (app) => {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD
        }
    });

    app.nodemailer = {
        send: async (params) => {
            const { to, cc = [], subject, html } = params;
            try {
                const mailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: to.join(','),
                    cc: cc.join(','),
                    subject,
                    html
                };
                await transporter.sendMail(mailOptions);
                console.log(`- Send email to ${to.join(', ')} successful!`);
            } catch (error) {
                console.error('- Send email failed!\n', error);
            }
        }
    };
};