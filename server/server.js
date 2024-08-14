import express from 'express';
import dotenv from 'dotenv';
import { ApiRouter } from './api/routes/ApiRouter.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use('/api', ApiRouter);

app.listen(8080, () => {
    console.log('App is running...');
});
