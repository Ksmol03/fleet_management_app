import { queryDatabase } from '../models/MySQL.database.js';

export const UpdateOrganizationController = async (req, res) => {
    const { id, name } = req.body;

    //Check if all data are provided
    if (!id || !name) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    //Check if org with this id exists and if user is the owner
    try {
        const query = 'SELECT * FROM organizations WHERE organization_id = ?';
        const [result] = await queryDatabase(query, [id]);

        if (!result) return res.status(401).json({ message: 'Unauthorized' });

        if (result.owner != res.locals.user_username)
            return res.status(401).json({ message: 'Unauthorized' });
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
