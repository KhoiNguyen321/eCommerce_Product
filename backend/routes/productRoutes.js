import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

// @desc Fetch all products
// @route GET /api/products
// @acess Fetch all products

router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/:id').get(getProductById);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;
