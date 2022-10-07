import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ history }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        placeholder='Search Product...'
        type='text'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button
        type='submit'
        variant='outline-success'
        style={{ marginLeft: '5px' }}
      >
        Search
      </Button>
    </Form>
  );
};
export default SearchBox;
