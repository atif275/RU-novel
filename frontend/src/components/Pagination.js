import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} mx-1 rounded`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
