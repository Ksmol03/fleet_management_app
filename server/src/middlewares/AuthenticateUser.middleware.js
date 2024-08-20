import { queryDatabase } from '../models/MySQL.database.js';

export const authenticateUserMiddleware = async (req, res, next) => {
    const sessionKey = req.cookies.sessionKey;
    if (!sessionKey) return res.status(401).json({ message: 'Unauthorized' });

    //Authorize user
    try {
        const query = 'SELECT username, ip, last_used FROM sessions WHERE session_key = ?';
        const [user] = await queryDatabase(query, [sessionKey]);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });

        if (user.ip != req.ip) return res.status(401).json({ message: 'Unauthorized' });

        const oneWeekAgo = Date.now() - 1000 * 60 * 60 * 24 * 7;
        if (user.last_used < oneWeekAgo) return res.status(401).json({ message: 'Unauthorized' });

        res.locals.username = user.username;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Update last used time of session key
    try {
        const query = 'UPDATE sessions SET last_used = CURRENT_TIMESTAMP WHERE session_key = ?';
        await queryDatabase(query, [sessionKey]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    next();
};
