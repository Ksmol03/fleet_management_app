import { Router } from 'express';
import { signUpController } from './controllers/SignUpController.js';
import { activationLinkController } from './controllers/ActivationLinkController.js';

export const AuthenticationRouter = Router();

AuthenticationRouter.post('/signup', signUpController);
AuthenticationRouter.put('/activate', activationLinkController);
