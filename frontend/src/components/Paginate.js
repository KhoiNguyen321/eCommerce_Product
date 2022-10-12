import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const Paginate = ({ pages, page, keyword = '' }) => {
  const navigate = useNavigate();
  return (
    pages > 1 && (
      <Pagination size='lg' className='mr-4'>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            key={x + 1}
            active={page === x + 1}
            onClick={() =>
              navigate(
                keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
              )
            }
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
