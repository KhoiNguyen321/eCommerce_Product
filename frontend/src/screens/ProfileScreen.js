import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_FAIL } from '../constants/userConstants';
import { listMyOrders } from '../actions/orderActions';
import { ValidateProfileForm } from '../utils/validateForm';
const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateDetails = useSelector((state) => state.userUpdateDetails);
  const { success } = userUpdateDetails;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrder, error: errorOrder, orders } = orderListMy;

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (field === 'name') {
      setName(value);
    }

    if (field === 'email') {
      setEmail(value);
    }

    if (field === 'password') {
      setPassword(value);
    }

    if (field === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMyOrders());

      if (
        user && // 👈 null and undefined check
        Object.keys(user).length === 0 &&
        Object.getPrototypeOf(user) === Object.prototype
      ) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
        setForm({ name: user.name, email: user.email });
      }
    }
  }, [navigate, dispatch, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = ValidateProfileForm(form);
    if (errors.length > 0) {
      setErrors(errors);
      return;
    } else {
      setErrors([]);
      if (form.password !== form.confirmPassword) {
        dispatch({
          type: USER_UPDATE_PROFILE_FAIL,
        });
      } else {
        dispatch(updateUserProfile({ id: user._id, name, email, password }));
      }
    }
  };
  const orderDetails = (id) => {
    navigate(`/order/${id}`);
  };
  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {errors.length > 0
          ? errors.map((err, index) => (
              <span key={index}>
                <Message variant='danger'>{err}</Message>
              </span>
            ))
          : success && (
              <Message variant='success'>Update profile is successed</Message>
            )}
        {error && <Message variant='danger'>{error}</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Name'
              value={name}
              onChange={(e) => setField('name', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setField('email', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setField('password', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setField('confirmPassword', e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h1>My Orders</h1>
        {loadingOrder ? (
          <Loader />
        ) : errorOrder ? (
          <Message variant='danger'>{errorOrder}</Message>
        ) : !orders ? (
          <Message variant='danger'>{errorOrder}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <p>Not Pay</p>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <></>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant='success'
                      onClick={() => orderDetails(order._id)}
                      className='btn-sm'
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
