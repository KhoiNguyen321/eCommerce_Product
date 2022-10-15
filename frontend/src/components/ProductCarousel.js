import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { listTopProducts } from '../actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

const ProductCarousel = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, products, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel className='bg-dark'>
      {products?.map((product) => (
        <Carousel.Item
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <Image
            className='d-block w-50'
            src={product.image}
            alt={product.name}
            fluid
          />
          <Carousel.Caption className='carousel-caption'>
            <h3>
              {product.name} ${product.price}
            </h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
