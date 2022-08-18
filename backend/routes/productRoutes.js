import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// @desc Fetch all products
// @route GET /api/products
// @acess Fetch all products

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;
