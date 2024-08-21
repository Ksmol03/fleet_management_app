import { queryDatabase } from '../models/MySQL.database.js';

export const CreateOrganizationController = async (req, res) => {
    const { name } = req.body;

    //Check if all data are provided
    if (!name) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    //Create organization
    let organizationId;
    try {
        const query = 'INSERT INTO organizations (organization_name) VALUES (?)';
        const result = await queryDatabase(query, [name]);
        organizationId = result.insertId;
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }

    //Get admin role
    try {
        const query =
            'INSERT INTO role_in_organization (username, organization_id, role_id) VALUES (?, ?, 3)';
        await queryDatabase(query, [res.locals.user_username, organizationId]);
        return res.json({ message: 'Organization created succesfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
