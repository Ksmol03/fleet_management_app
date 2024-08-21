import { queryDatabase } from '../models/MySQL.database';

export const getPermissionMiddleware = (permission) => {
    return async (req, res, next) => {
        const { id } = req.body;

        try {
            const query =
                'SELECT r.role_name AS role FROM role_in_organization rio JOIN roles r USING (role_id) WHERE rio.organization_id = ? AND rio.username = ?';
            const [{ role }] = await queryDatabase(query, [id, res.locals.user_username]);
            console.log(role);

            next();
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};
