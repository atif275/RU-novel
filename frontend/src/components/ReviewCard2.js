import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaQuoteLeft, FaTrashAlt } from 'react-icons/fa';
import DOMPurify from 'dompurify';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const ReviewSection = ({ reviews, onReviewDelete }) => {
  const [sortBy, setSortBy] = useState('Top');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(Math.ceil(reviews.length / itemsPerPage));

  const sortReviews = (reviews, sortBy) => {
    switch (sortBy) {
      case 'Newest':
        return [...reviews].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      case 'Oldest':
        return [...reviews].sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      case 'Most Upvotes':
        return [...reviews].sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      case 'Top':
      default:
        return reviews;
    }
  };

  const sortedReviews = sortReviews(reviews, sortBy);

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`https://api.ru-novel.ru/api/reviewss/${reviewId}`);
      onReviewDelete(reviewId); // Notify parent component to remove the review from state
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  const renderStars = (rating, label) => (
    <div className="flex flex-col items-center">
      {label && <span className="text-gray-600 text-[12px]">{label}</span>}
      <div className="flex text-[12px]">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar key={index} className={`text-[12x] ${index < Math.floor(rating) ? 'text-red-600' : 'text-gray-300'}`} />
        ))}
      </div>
    </div>
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayedReviews = sortedReviews.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <div className="bg-white p-6">
      {/* Heading and Sort By */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-8 border-b border-gray-200 py-4">
        <h3 className="text-[16px] font-bold text-red-600 flex items-center">
          <FaQuoteLeft className='mr-2 text-gray-500 text-[16px]' />
          MY REVIEWS
        </h3>
        <div className="flex items-center">
          <span className="text-sm text-gray-700 mr-2">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-full px-2 py-1 text-sm"
          >
            <option value="Top">Top</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
            <option value="Most Upvotes">Most Upvotes</option>
          </select>
        </div>
      </div>

      {/* Review Cards */}
      {displayedReviews.map((review) => (
        <div key={review._id} className="flex flex-col md:flex-row items-center md:items-start mb-6 border-b border-gray-200 pb-6">
          {/* Avatar and Rating */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start mb-4 md:mb-0 md:mr-4">
            <div className="mb-2 w-16 h-16 overflow-hidden border-2 border-gray-300 rounded-full">
              <img
                src={review.profilepic}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {renderStars(parseFloat(review.rating.overall) || 0, 'Overall')}
            {review.rating.style && renderStars(parseFloat(review.rating.style), 'Style')}
            {review.rating.story && renderStars(parseFloat(review.rating.story), 'Story')}
            {review.rating.grammar && renderStars(parseFloat(review.rating.grammar), 'Grammar')}
            {review.rating.character && renderStars(parseFloat(review.rating.character), 'Character')}
          </div>

          {/* Review Content */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[18px] font-bold text-gray-700">{review.title}</h2>
                <div className='flex gap-1 items-end'>
                  <p className="text-[14px] font-bold text-red-600">ON </p>
                  <button  className="text-[13px] font-bold text-blue-600 hover:underline">{review.bookName || 'Anonymous'}</button>
                </div>
              </div>
              {/* Date */}
              <div className="text-blue-600 font-bold text-[12px] hover:underline">
                <p>{new Date(review.datetime).toLocaleString()}</p>
              </div>
            </div>

            {/* Review Text */}
            <div className="text-gray-800 text-sm mt-4">
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.text) }} />
            </div>

            {/* Like/Dislike Counts and Delete Button */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-blue-600">
                  <FaThumbsUp className="mr-1" /> {review.upvotes || 0}
                </div>
                <div className="flex items-center text-red-600">
                  <FaThumbsDown className="mr-1" /> {review.downvotes || 0}
                </div>
              </div>
              <button
                className="flex items-center text-red-600"
                onClick={() => handleDelete(review._id)}
              >
                <FaTrashAlt className="mr-1" /> Delete Review
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          breakClassName={"page-item"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"inline-flex list-none pagination"}
          pageClassName={"inline mx-1"}
          pageLinkClassName={
            "px-3 py-1 rounded hover:bg-[#337ab7] hover:text-white"
          }
          previousClassName={"inline mx-1"}
          previousLinkClassName={
            "px-3 py-1 rounded hover:bg-[#337ab7] hover:text-white"
          }
          nextClassName={"inline mx-1"}
          nextLinkClassName={
            "px-3 py-1 rounded hover:bg-[#337ab7] hover:text-white"
          }
          activeClassName={"rounded mt-[-3px] py-[3px] bg-[#337ab7] text-white"}
          forcePage={currentPage}
        />
      </div>
    </div>
  );
};

export default ReviewSection;