import { Router } from 'express';
import { AuthenticationRouter } from '../authentication/AuthenticationRouter.js';

export const ApiRouter = Router();

ApiRouter.use('/authentication', AuthenticationRouter);
