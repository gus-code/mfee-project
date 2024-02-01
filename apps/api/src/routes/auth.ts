import express from 'express';

import authController from '../controllers/auth';

const router = express.Router();
export const categories = [];

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/refreshToken', authController.refreshToken);

export default router;
