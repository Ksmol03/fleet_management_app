import { Router } from 'express';
import { signUpController } from './controllers/SignUpController.js';
import { activationLinkController } from './controllers/ActivationLinkController.js';
import { accountActivationController } from './controllers/AccountActivationController.js';

export const AuthenticationRouter = Router();

AuthenticationRouter.post('/signup', signUpController);
AuthenticationRouter.put('/activate', activationLinkController);
AuthenticationRouter.put('/activate/:token', accountActivationController);
