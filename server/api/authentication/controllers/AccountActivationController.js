import { queryDatabase } from '../../database/MySQLDatabase.js';

export const accountActivationController = async (req, res) => {
    const token = req.params.token;

    //Get user data from token
    try {
        const query =
            'SELECT username, created_at FROM activations WHERE activation_token = ? LIMIT 1';
        const [{ username, created_at }] = await queryDatabase(query, [token]);
        res.locals.username = username;
        res.locals.created_at = created_at;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if user is activated
    try {
        const query = 'SELECT activated FROM users WHERE username = ?';
        const [{ activated }] = await queryDatabase(query, [res.locals.username]);
        if (activated) return res.status(409).json({ message: 'User already activated' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if link has expired
    try {
        const oneHourAgo = Date.now() - 1000 * 60 * 60;
        if (res.locals.created_at < oneHourAgo)
            return res.status(410).json({ message: 'Link has expired' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Acticate user
    try {
        const query = 'UPDATE users SET activated = 1 WHERE username = ?';
        await queryDatabase(query, [res.locals.username]);
        res.json({ message: 'User activated succesfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
