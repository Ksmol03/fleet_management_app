import { queryDatabase } from '../models/MySQL.database.js';

export const CreateOrganizationController = async (req, res) => {
    const { name } = req.body;

    //Check if all data are provided
    if (!name) {
        return res.status(400).json({ message: 'Not all data provided' }).end();
    }

    try {
        const query = 'INSERT INTO organizations (organization_name, owner) VALUES (?, ?)';
        await queryDatabase(query, [name, res.locals.username]);
        return res.json({ message: 'Organization created succesfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
