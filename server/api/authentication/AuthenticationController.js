import { queryDatabase } from '../database/MySQLDatabase.js';

export const signUpController = async (req, res) => {
    const { username, email, password, accept_terms } = req.body;

    //Check if all data are provided
    if (!username || !email || !password || !accept_terms) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
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

    //Check password stength
    if (!validPassword(password)) {
        return res.status(400).json({
            message: 'Password does not meet the requirements',
        });
    }

    res.json({ message: 'Nice' });
    res.end();
};

const validPassword = (password) => {
    const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*()])(?=.*[0-9])(?=.*[a-z]).{10,}$/;
    return passwordRegex.test(password);
};
