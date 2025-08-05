import express from 'express';
import { uploadProfilePicture, getProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.get('/', getProfile);
router.post('/upload', upload.single('profilePicture'), uploadProfilePicture);

export default router;