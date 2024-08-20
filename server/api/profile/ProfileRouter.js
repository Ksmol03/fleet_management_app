import { Router } from 'express';
import { changePasswordController } from './controllers/ChangePasswordController.js';

export const ProfileRouter = Router();

ProfileRouter.put('/change-password', changePasswordController);
