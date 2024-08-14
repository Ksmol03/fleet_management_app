import { Router } from "express";
import { queryDatabase } from "../database/MySQLDatabase.js";

export const AuthenticationRouter = Router();

AuthenticationRouter.get('/', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM users', []);

    console.log(result);
    res.end();
})