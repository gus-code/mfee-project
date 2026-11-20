
import express from 'express';

import authController from '../controllers/auth';

const router = express.Router();

router.get('/register', authController.register);

router.get('/login', authController.login);

router.get('/refresh', authController.refresh);

router.post('/logout', authController.logout);

export default router;