import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { ApiRouter } from './src/routes/Api.routes.js';

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());

app.use('/api', ApiRouter);

app.listen(8080, () => {
    console.log('App is running...');
});
