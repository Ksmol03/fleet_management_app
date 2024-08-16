import { Router } from 'express';
import { signUpController } from './controllers/SignUpController.js';

export const AuthenticationRouter = Router();

AuthenticationRouter.post('/signup', signUpController);
