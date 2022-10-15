import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split('/')[1];
  const pathPagingBySearch = location.pathname.split('/');

  const productList = useSelector((state) => state.productList);
  const { loading, products, page, pages } = productList;
  let keyword = location.pathname.substring(
    location.pathname.lastIndexOf('/') + 1,
    location.length
  );

  let search = '';
  let number = 1;
  if (pathPagingBySearch.length > 3) {
    search = pathPagingBySearch[2];
    number = pathPagingBySearch[4];
  }

  useEffect(() => {
    if (pathPagingBySearch.length <= 3) {
      if (path === 'search') {
        dispatch(listProducts(keyword, ''));
      } else {
        let pageNumber = Number(keyword) || 1;
        dispatch(listProducts('', pageNumber));
      }
    } else {
      dispatch(listProducts(search, number));
    }
  }, [
    dispatch,
    path,
    location.length,
    location.pathname,
    keyword,
    pathPagingBySearch.length,
    number,
    search,
  ]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={'/'} className='btn btn-dark'>
          Go Back
        </Link>
      )}
      <h1>Lasted Products</h1>
      {loading ? (
        <Loader />
      ) : typeof products === 'string' ? (
        <Message variant='danger'>{products}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <Paginate
            pages={pages}
            page={page}
            keyword={
              path === 'search' && pathPagingBySearch.length <= 3
                ? keyword
                : search
            }
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
