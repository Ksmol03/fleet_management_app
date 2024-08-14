import { Router } from 'express';
import { signUpController } from './AuthenticationController.js';

export const AuthenticationRouter = Router();

AuthenticationRouter.post('/signup', signUpController);
