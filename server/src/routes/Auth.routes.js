import { Router } from 'express';
import { signUpController } from '../controllers/SignUp.controller.js';
import { activationLinkController } from '../controllers/ActivationLink.controller.js';
import { accountActivationController } from '../controllers/AccountActivation.controller.js';
import { signInController } from '../controllers/SignIn.controller.js';

export const AuthRouter = Router();

AuthRouter.post('/sign-up', signUpController);
AuthRouter.put('/activation-link', activationLinkController);
AuthRouter.put('/activate/:token', accountActivationController);
AuthRouter.post('/sign-in', signInController);
