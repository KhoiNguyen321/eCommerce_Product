import React, { useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutStep from '../components/CheckoutStep.js';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
  };

  return (
    <FormContainer>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                name='checkbox'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Form.Check
                type='radio'
                label='Stripe'
                name='checkbox'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        <Button className='my-2' type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
