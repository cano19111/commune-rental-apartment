const nodemailer = require('nodemailer');
const to = require('await-to-js').default;

const sendMail = async ({ email, html, subject }) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let [error, info] = await to(
        transporter.sendMail({
            from: '"Rent Apartment" <no-relply@rentapartment.com>',
            to: email,
            subject: subject,
            html: html,
        }),
    );
    if (error) {
        throw error;
    }
    return info;
};

module.exports = sendMail;
