import { Router } from 'express';
import { signUpController } from './controllers/SignUpController.js';
import { activationLinkController } from './controllers/ActivationLinkController.js';
import { accountActivationController } from './controllers/AccountActivationController.js';
import { changePasswordController } from './controllers/ChangePasswordController.js';
import { signInController } from './controllers/SignInController.js';
import { authenticateUserMiddleware } from './middlewares/AuthenticateUserMiddleware.js';

export const AuthenticationRouter = Router();

AuthenticationRouter.post('/sign-up', signUpController);
AuthenticationRouter.put('/activation-link', activationLinkController);
AuthenticationRouter.put('/activate/:token', accountActivationController);
AuthenticationRouter.post('/sign-in', signInController);

AuthenticationRouter.get('/auth', authenticateUserMiddleware);

AuthenticationRouter.put('/change-password', changePasswordController);
