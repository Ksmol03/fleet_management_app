import { queryDatabase } from '../models/MySQL.database.js';

export const UpdateOrganizationController = async (req, res) => {
    const { id, name } = req.body;

    //Check if all data are provided
    if (!id || !name) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    //Check if organization with this id exists
    try {
        const query = 'SELECT * FROM organizations WHERE organization_id = ?';
        const [result] = await queryDatabase(query, [id]);

        if (!result) return res.status(401).json({ message: 'Unauthorized' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Check if user has permissions
    try {
        const query =
            'SELECT role_id FROM role_in_organization WHERE username = ? AND organization_id = ?';
        const [result] = await queryDatabase(query, [res.locals.user_username, id]);

        if (result.role_id != 3) return res.status(401).json({ message: 'Unauthorized' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Update organization
    try {
        const query = 'UPDATE organizations SET organization_name = ? WHERE organization_id = ?';
        await queryDatabase(query, [name, id]);
        return res.json({ message: 'Organization updated succesfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
