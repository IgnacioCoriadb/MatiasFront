import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


const Paginate = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
        <Pagination.Item key={i} active={i === currentPage}  onClick={() => onPageChange(i)}>
        {i}
      </Pagination.Item>
    );
  }

  return (
      <Pagination >
          {currentPage > 1 && (
            <Pagination.First onClick={() => onPageChange(1)}  />
          )}
          {currentPage > 1 && (
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
          )}
          {pages}
          {currentPage < totalPages && (
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
          )}
          {currentPage < totalPages && (
            <Pagination.Last onClick={() => onPageChange(totalPages)} />
          )}
        </Pagination>   
  );
};

export default Paginate;
