import { queryDatabase } from '../../database/MySQLDatabase.js';
import { validPassword } from '../utils/CredentialsValidatorUtil.js';

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
        ] = await queryDatabase(query, [username]);

        //Get current password
        let currentHashedPassword = fifth_hashed_password;
        if (!fifth_hashed_password)
            currentHashedPassword = fourth_hashed_password;
        if (!fourth_hashed_password)
            currentHashedPassword = third_hashed_password;
        if (!third_hashed_password)
            currentHashedPassword = second_hashed_password;
        if (!second_hashed_password)
            currentHashedPassword = first_hashed_password;

        if (!bcrypt.compareSync(password, currentHashedPassword))
            return res.status(401).json({
                message: 'Invalid password',
            });

        //Check passwords history
        if (bcrypt.compareSync(newPassword, first_hashed_password))
            return res.status(409).json({
                message:
                    'New password must be different than 5 previous passwords',
            });
        if (
            second_hashed_password &&
            bcrypt.compareSync(newPassword, second_hashed_password)
        )
            return res.status(409).json({
                message:
                    'New password must be different than 5 previous passwords',
            });
        if (
            third_hashed_password &&
            bcrypt.compareSync(newPassword, third_hashed_password)
        )
            return res.status(409).json({
                message:
                    'New password must be different than 5 previous passwords',
            });
        if (
            fourth_hashed_password &&
            bcrypt.compareSync(newPassword, fourth_hashed_password)
        )
            return res.status(409).json({
                message:
                    'New password must be different than 5 previous passwords',
            });
        if (
            fifth_hashed_password &&
            bcrypt.compareSync(newPassword, fifth_hashed_password)
        )
            return res.status(409).json({
                message:
                    'New password must be different than 5 previous passwords',
            });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
