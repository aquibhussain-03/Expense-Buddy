import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

router.post('/login', login);

export default router;