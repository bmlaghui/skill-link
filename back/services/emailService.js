const nodemailer = require('nodemailer');
require('dotenv').config();



const sendEmail = async (options) => {
    try {
        console.log('Email Cred ', process.env.GMAIL_USERNAME, process.env.GMAIL_PASSWORD)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD,
            },
            // Remove the following line to use the default authentication method
            // authMethod: 'PLAIN',
        });



        const mailOptions = {
            from: 'noreply@yourdomain.com',
            to: options.userEmail,
            subject: options.subjectEmail,
            text: options.bodyEmail,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (err) {
        console.error(err);
        throw new Error('Failed to send email', { err: err.message });
    }
};

module.exports = { sendEmail };
