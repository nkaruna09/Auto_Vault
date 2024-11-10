// authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js'; // Add ".js" for module resolution

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
