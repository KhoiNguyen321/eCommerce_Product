import express from 'express'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userControllers.js'
import {protect} from '../middleware/authMiddleware.js' 


// @desc Fetch all products
// @route GET /api/products
// @acess Fetch all products
router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

export default router
