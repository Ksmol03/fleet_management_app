import bcrypt from 'bcrypt';
import { queryDatabase } from '../../database/MySQLDatabase.js';
import { validPassword, validUsername } from '../utils/CredentialsValidatorUtil.js';

export const signInController = async (req, res) => {
    const { username, password } = req.body;

    //Check if all data are provided
    if (!username || !password) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    //Check if username is valid
    if (!validUsername(username)) {
        return res.status(400).json({
            message: 'Invalid username or password',
        });
    }

    //Check password stength
    if (!validPassword(password)) {
        return res.status(400).json({
            message: 'Invalid username or password',
        });
    }

    //Check if user exists
    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [user] = await queryDatabase(query, [username]);
        if (!user)
            return res.status(400).json({
                message: 'Invalid username or password',
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if password is valid
    try {
        const query =
            'SELECT first_hashed_password, second_hashed_password, third_hashed_password, fourth_hashed_password, fifth_hashed_password FROM users WHERE username = ?';
        const [
            {
                first_hashed_password,
                second_hashed_password,
                third_hashed_password,
                fourth_hashed_password,
                fifth_hashed_password,
            },
        ] = await queryDatabase(query, [username]);

        let currentHashedPassword = fifth_hashed_password;
        if (!fifth_hashed_password) currentHashedPassword = fourth_hashed_password;
        if (!fourth_hashed_password) currentHashedPassword = third_hashed_password;
        if (!third_hashed_password) currentHashedPassword = second_hashed_password;
        if (!second_hashed_password) currentHashedPassword = first_hashed_password;

        if (!bcrypt.compareSync(password, currentHashedPassword))
            return res.status(400).json({
                message: 'Invalid username or password',
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if user is activated
    try {
        const query = 'SELECT activated FROM users WHERE username = ?';
        const [{ activated }] = await queryDatabase(query, [username]);

        console.log(activated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    res.json({ message: 'Logged In' });
};
