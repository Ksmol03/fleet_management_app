import express from 'express';
import { ApiRouter } from './api/routes/ApiRouter.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/api', ApiRouter)

app.listen(8080, () => {
    console.log('App is running...');
})