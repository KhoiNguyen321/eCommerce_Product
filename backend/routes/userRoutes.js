import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userControllers.js'


// @desc Fetch all products
// @route GET /api/products
// @acess Fetch all products

router.post('/login', authUser)

export default router
