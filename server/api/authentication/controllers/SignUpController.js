import { queryDatabase } from '../../database/MySQLDatabase.js';
import bcrypt from 'bcrypt';

export const signUpController = async (req, res) => {
    const { username, email, password, accept_terms } = req.body;

    //Check if all data are provided
    if (!username || !email || !password || accept_terms == null) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    //Check if username is valid
    if (!validUsername(username)) {
        return res.status(400).json({
            message: 'Invalid username',
        });
    }

    //Check if username is taken
    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const rows = await queryDatabase(query, [username]);

        if (rows.length != 0) {
            return res.status(409).json({ message: 'Username already taken' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if email is valid
    if (!validEmail(email)) {
        return res.status(400).json({
            message: 'Invalid email address',
        });
    }

    //Check if email is taken
    try {
        const lowerCaseEmail = email.toLowerCase();
        const query = 'SELECT * FROM users WHERE email = ?';
        const rows = await queryDatabase(query, [lowerCaseEmail]);

        if (rows.length != 0) {
            return res.status(409).json({ message: 'Email already taken' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check password stength
    if (!validPassword(password)) {
        return res.status(400).json({
            message: 'Password does not meet the requirements',
        });
    }

    //Chech if terms are accepted
    if (!accept_terms) return res.status(400).json({ message: 'Terms not accepted' });

    //Create user account
    try {
        const lowerCaseEmail = email.toLowerCase();
        const hashed_password = bcrypt.hashSync(password, 12);
        const query =
            'INSERT INTO users (username, email, first_hashed_password, accept_terms) VALUES (?, ?, ?, ?)';
        await queryDatabase(query, [username, lowerCaseEmail, hashed_password, accept_terms]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    res.json({ message: 'Succesfully signed up' });
};

const validPassword = (password) => {
    if (password.length < 10) return false;
    const oneUpperCaseRegex = /[A-Z]/;
    if (!oneUpperCaseRegex.test(password)) return false;
    const oneDigitRegex = /\d/;
    if (!oneDigitRegex.test(password)) return false;
    const oneSymbolRegex = /[^\da-zA-Z]/;
    if (!oneSymbolRegex.test(password)) return false;
    return true;
};

const validUsername = (username) => {
    if (username.length < 5) return false;
    const usernameRegex = /^[a-zA-Z]+[\da-zA-Z]*$/;
    if (!usernameRegex.test(username)) return false;
    return true;
};

const validEmail = (email) => {
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) return false;
    return true;
};
