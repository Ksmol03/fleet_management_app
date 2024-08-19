import express from 'express';
import dotenv from 'dotenv';
import { ApiRouter } from './api/routes/ApiRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use('/api', ApiRouter);

app.listen(8080, () => {
    console.log('App is running...');
});
