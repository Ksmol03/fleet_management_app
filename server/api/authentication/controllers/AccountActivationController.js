import { queryDatabase } from '../../database/MySQLDatabase.js';

export const accountActivationController = async (req, res) => {
    const token = req.params.token;

    //Get user data from token
    let userUsername;
    let tokenCreatedAt;
    try {
        const query =
            'SELECT username, created_at FROM activations WHERE activation_token = ? LIMIT 1';
        const [{ username, created_at }] = await queryDatabase(query, [token]);
        userUsername = username;
        tokenCreatedAt = created_at;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if user is activated
    try {
        const query = 'SELECT activated FROM users WHERE username = ?';
        const [{ activated }] = await queryDatabase(query, [userUsername]);
        if (activated) return res.status(409).json({ message: 'User already activated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if link has expired
    try {
        const oneHourAgo = Date.now() - 1000 * 60 * 60;
        if (tokenCreatedAt < oneHourAgo)
            return res.status(410).json({ message: 'Link has expired' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Acticate user
    try {
        const query = 'UPDATE users SET activated = 1 WHERE username = ?';
        await queryDatabase(query, [userUsername]);
        res.json({ message: 'User activated succesfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
