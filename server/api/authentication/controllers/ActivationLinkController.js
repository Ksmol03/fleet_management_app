import { queryDatabase } from '../../database/MySQLDatabase.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const activationLinkController = async (req, res) => {
    const { email } = req.body;

    //Check if user exists and is activated
    try {
        const query = 'SELECT username, activated FROM users WHERE email = ?';
        const result = await queryDatabase(query, [email]);

        if (result.length == 0)
            return res
                .status(404)
                .json({ message: 'No account found with the provided email address' });

        const user = result[0];
        if (user.activated) return res.status(400).json({ message: 'User already activated' });

        res.locals.username = user.username;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Create activation code
    const activation_code = crypto.randomBytes(20).toString('hex');
    try {
        const query = 'INSERT INTO activations (activation_code, username) VALUES (?, ?)';
        await queryDatabase(query, [activation_code, res.locals.username]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Send activation link
    const message = {
        from: '"NodeJS app" <nodejs@app.com>',
        to: email,
        subject: 'Nodemailer',
        text: activation_code,
    };

    const info = await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.error('Email error: ' + err.message);
        }

        console.log('Message sent: %s', info.messageId);
    });

    return res.json({ message: 'Activation link sent' });
};
