import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const pageNumber = req.query.pageNumber;
  const pageSize = 4;
  let page = Number(req.query.pageNumber) || 1;
  let count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

const createProductReview = asyncHandler(async (req, res) => {
  const { comment, rating } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReview = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReview) {
      res.status(400);
      throw new Error('Product already review');
    } else {
      const review = {
        rating: Number(rating),
        comment,
        user: req.user._id,
        name: req.user.name,
      };
      product.reviews.push(review);

      product.numReviews = product.reviews.length;
      product.rating = Number(
        product.reviews.reduce((acc, item) => acc + item.rating, 0) /
          product.reviews.length
      ).toFixed(2);

      await product.save();
      res.status(201).json({ message: 'Review added' });
    }
  } else {
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById, createProductReview, getTopProducts };
