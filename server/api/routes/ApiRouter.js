import { Router } from 'express';
import { AuthenticationRouter } from '../authentication/AuthenticationRouter.js';
import { FleetManagementRouter } from '../fleet_management/FleetManagementRouter.js';
import { ProfileRouter } from '../profile/ProfileRouter.js';
import { authenticateUserMiddleware } from '../authentication/middlewares/AuthenticateUserMiddleware.js';

export const ApiRouter = Router();

ApiRouter.use('/auth', AuthenticationRouter);

ApiRouter.use(authenticateUserMiddleware);
ApiRouter.use('/profile', ProfileRouter);
ApiRouter.use('/fleet', FleetManagementRouter);
