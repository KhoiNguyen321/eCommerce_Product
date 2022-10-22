import express from 'express';
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUser,
} from '../controllers/userControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// @desc Fetch all products
// @route GET /api/products
// @acess Fetch all products
router.route('/').post(registerUser).get(protect, admin, getUser);
router.post('/login', authUser);
router.route('/profile').get(protect, getUserProfile);
router.route('/profile').put(protect, updateUserProfile);
export default router;
