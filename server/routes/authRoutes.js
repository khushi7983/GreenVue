import express from 'express';
import { signup, login, getProfile, logout } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', authenticate, getProfile);
router.post('/logout', logout);

export default router;