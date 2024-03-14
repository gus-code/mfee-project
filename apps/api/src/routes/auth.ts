import express from 'express';

import authController from '../controllers/auth';

const router = express.Router();

//Register
router.post('/register', authController.register);

//Login
router.post('/login', authController.login);

//Logout
router.post('/logout', authController.logout);

//Regresh
router.post('/refresh', authController.refresh);

export default router;