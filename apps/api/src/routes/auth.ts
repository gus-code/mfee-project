import express from 'express';

import authController from '../controllers/auth';

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/refresh', authController.refresh);

router.post('/logout', authController.logout);

export default router;
