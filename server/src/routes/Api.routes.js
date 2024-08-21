import { Router } from 'express';
import { AuthRouter } from './Auth.routes.js';
import { authenticateUserMiddleware } from '../middlewares/AuthenticateUser.middleware.js';
import { changePasswordController } from '../controllers/ChangePassword.controller.js';
import { CreateOrganizationController } from '../controllers/CreateOrganization.controller.js';

export const ApiRouter = Router();

ApiRouter.use('/auth', AuthRouter);

ApiRouter.use(authenticateUserMiddleware);
ApiRouter.put('/change-password', changePasswordController);

ApiRouter.post('/organization', CreateOrganizationController);
