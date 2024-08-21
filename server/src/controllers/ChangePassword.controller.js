import { validPassword } from '../utils/CredentialsValidator.util.js';
import { queryDatabase } from '../models/MySQL.database.js';
import bcrypt from 'bcrypt';

export const changePasswordController = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    //Check if all data are provided
    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    //Check passwords stength
    if (!validPassword(oldPassword)) {
        return res.status(401).json({
            message: 'Invalid password',
        });
    }
    if (!validPassword(newPassword)) {
        return res.status(401).json({
            message: 'Invalid password',
        });
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
        ] = await queryDatabase(query, [res.locals.user_username]);

        //Get current password
        const currentHashedPassword = () => {
            if (!second_hashed_password) return first_hashed_password;
            if (!third_hashed_password) return second_hashed_password;
            if (!fourth_hashed_password) return third_hashed_password;
            if (!fifth_hashed_password) return fourth_hashed_password;
            return fifth_hashed_password;
        };

        if (!bcrypt.compareSync(oldPassword, currentHashedPassword()))
            return res.status(401).json({
                message: 'Invalid password',
            });

        //Check passwords history
        if (bcrypt.compareSync(newPassword, first_hashed_password))
            return res.status(409).json({
                message: 'New password must be different than 5 previous passwords',
            });
        if (second_hashed_password && bcrypt.compareSync(newPassword, second_hashed_password))
            return res.status(409).json({
                message: 'New password must be different than 5 previous passwords',
            });
        if (third_hashed_password && bcrypt.compareSync(newPassword, third_hashed_password))
            return res.status(409).json({
                message: 'New password must be different than 5 previous passwords',
            });
        if (fourth_hashed_password && bcrypt.compareSync(newPassword, fourth_hashed_password))
            return res.status(409).json({
                message: 'New password must be different than 5 previous passwords',
            });
        if (fifth_hashed_password && bcrypt.compareSync(newPassword, fifth_hashed_password))
            return res.status(409).json({
                message: 'New password must be different than 5 previous passwords',
            });

        //Change password in db
        const newHashedPassword = bcrypt.hashSync(newPassword, 12);
        let insertPasswordQuery;
        if (fifth_hashed_password == currentHashedPassword()) {
            insertPasswordQuery =
                'UPDATE users SET first_hashed_password = ?, second_hashed_password = ?, third_hashed_password = ?, fourth_hashed_password = ?, fifth_hashed_password = ? WHERE username = ?';
            await queryDatabase(insertPasswordQuery, [
                second_hashed_password,
                third_hashed_password,
                fourth_hashed_password,
                fifth_hashed_password,
                newHashedPassword,
                res.locals.user_username,
            ]);

            return res.json({ message: 'Password changed' });
        }
        if (first_hashed_password == currentHashedPassword())
            insertPasswordQuery = 'UPDATE users SET second_hashed_password = ? WHERE username = ?';
        if (second_hashed_password == currentHashedPassword())
            insertPasswordQuery = 'UPDATE users SET third_hashed_password = ? WHERE username = ?';
        if (third_hashed_password == currentHashedPassword())
            insertPasswordQuery = 'UPDATE users SET fourth_hashed_password = ? WHERE username = ?';
        if (fourth_hashed_password == currentHashedPassword())
            insertPasswordQuery = 'UPDATE users SET fifth_hashed_password = ? WHERE username = ?';
        await queryDatabase(insertPasswordQuery, [newHashedPassword, res.locals.user_username]);

        return res.json({ message: 'Password changed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
