import { queryDatabase } from '../../database/MySQLDatabase.js';

export const authenticateUserMiddleware = async (req, res) => {
    const sessionKey = req.cookies.sessionKey;

    //Verify user
    try {
        const query =
            'SELECT username, ip, last_used FROM sessions WHERE session_key = ?';
        const [{ username, ip, last_used }] = await queryDatabase(query, [
            sessionKey,
        ]);

        if (req.ip != ip) {
            res.cookie('sessionKey', '', { httpOnly: true });
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
        if (last_used < oneWeekAgo) {
            res.cookie('sessionKey', '', { httpOnly: true });
            return res.status(401).json({ message: 'Unauthorized' });
        }

        return res.json({ message: 'Authorized' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
