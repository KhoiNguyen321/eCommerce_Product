import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <Navbar.Brand as={Link} to='/login'>
            Sign In
          </Navbar.Brand>
        ) : (
          <Navbar.Brand disabled>Sign In</Navbar.Brand>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Navbar.Brand as={Link} to='/shipping'>
            Shipping
          </Navbar.Brand>
        ) : (
          <Navbar.Brand disabled>Shipping</Navbar.Brand>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Navbar.Brand as={Link} to='/payment'>
            Payment
          </Navbar.Brand>
        ) : (
          <Navbar.Brand disabled>Payment</Navbar.Brand>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Navbar.Brand as={Link} to='/place-order'>
            Place Order
          </Navbar.Brand>
        ) : (
          <Navbar.Brand disabled>Place Order</Navbar.Brand>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
