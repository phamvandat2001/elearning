module.exports = (app) => {
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_EMAIL,
          pass: process.env.NODEMAILER_PASSWORD
        }
    });

    app.nodemailer = {
        send: async (to, cc, subject, html) => {
            try {
                const mailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: to.join(','),
                    cc: cc.join(','),
                    subject,
                    html
                };
                await transporter.sendMail(mailOptions);
                console.log('- Send email successful!');
            } catch (error) {
                console.error('- Send email failed!', error);
            }
        }
    };
};