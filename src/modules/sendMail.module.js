const nodemailer = require('nodemailer');

const sendMail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            port: process.env.MAILER_PORT,
            secure: true,
            auth: {
                user: process.env.MAILER_USERNAME,
                pass: process.env.MAILER_PASSWORD
            }
        });

        await transporter.sendMail({
            from: `Tera Mailer ${ process.env.MAILER_USERNAME }`,
            to: email,
            subject: subject,
            text: text,
            html: html
        });

        return {
            status: 'success',
            message: 'Message sent successfully'
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'Email cannot be sent',
            error: error
        }
    }
}

module.exports = sendMail;