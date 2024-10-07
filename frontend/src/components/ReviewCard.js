import React, { useState, useEffect } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaQuoteLeft } from 'react-icons/fa';
import axios from 'axios';
import DOMPurify from 'dompurify';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

const ReviewSection = ({ bookName }) => {
  const [reviews, setReviews] = useState([]);
  const [sortBy, setSortBy] = useState('Top');
  const [voteStatus, setVoteStatus] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const [pageCount, setPageCount] = useState(0);
  const theme = useSelector((state) => state.userData.theme); // Get current theme

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.ru-novel.ru/api/reviews?bookName=${encodeURIComponent(bookName)}`);
        const sortedReviews = sortReviews(response.data, sortBy);
        setReviews(sortedReviews);
        setPageCount(Math.ceil(sortedReviews.length / itemsPerPage));

        const initialVoteStatus = response.data.reduce((acc, review) => {
          acc[review._id] = null;
          return acc;
        }, {});
        setVoteStatus(initialVoteStatus);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    if (bookName) {
      fetchReviews();
    }
  }, [bookName, sortBy]);

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

  const handleVote = async (reviewId, type) => {
    if (voteStatus[reviewId]) return;

    try {
      await axios.post(`https://api.ru-novel.ru/api/reviews/${reviewId}/${type}`);
      setVoteStatus((prev) => ({
        ...prev,
        [reviewId]: type,
      }));
    } catch (err) {
      console.error('Error updating vote:', err);
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

  const displayedReviews = reviews.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Conditional styles based on theme
  const containerStyles = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  const borderStyles = theme === 'dark' ? 'border-[#5c5c5c]' : 'border-gray-200';
  const buttonStyles = (isActive, activeColor, inactiveColor) =>
    isActive ? `bg-${activeColor} text-white` : `bg-transparent text-${inactiveColor}`;

  return (
    <div className={`p-6 ${containerStyles}`}>
      {/* Heading and Sort By */}
      <div className={`flex flex-col md:flex-row gap-2 items-center justify-between mb-8 py-4 ${borderStyles}`}>
        <h3 className="text-[16px] font-bold text-red-600 flex items-center">
          <FaQuoteLeft className='mr-2 text-gray-500 text-[16px]' />
          REVIEWS
        </h3>
        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`border rounded-full px-2 py-1 text-sm ${theme === 'dark' ? 'bg-gray-700 border-[#5c5c5c] text-white' : 'border-gray-300'}`}
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
        <div key={review._id} className={`flex flex-col md:flex-row items-center md:items-start mb-6 pb-6 ${borderStyles}`}>
          {/* Avatar and Rating */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start mb-4 md:mb-0 md:mr-4">
            <div className={`mb-2 w-16 h-16 overflow-hidden border-2 rounded-full ${theme === 'dark' ? 'border-[#5c5c5c]' : 'border-gray-300'}`}>
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
                <h2 className={`text-[18px] font-bold ${theme === 'dark' ? 'text-[#c2a970]' : 'text-gray-700'}`}>{review.title}</h2>
                <div className='flex gap-1 items-end'>
                  <p className="text-[14px] font-bold text-red-600">BY </p>
                  <button href='#' className="text-[12px] font-bold text-blue-600 hover:underline">{review.user || 'Anonymous'}</button>
                </div>
              </div>
              {/* Date */}
              <div className="text-blue-600 font-bold text-[12px] hover:underline">
                <p>{new Date(review.datetime).toLocaleString()}</p>
              </div>
            </div>

            {/* Review Text */}
            <div className={`mt-4 ${theme === 'dark' ? 'text-[#cfcfcf]' : 'text-gray-800'} text-sm`}>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.text) }} />
            </div>

            {/* Like/Dislike Buttons */}
            <div className="flex items-center justify-end mt-4">
              <div className="flex items-center space-x-2">
                <button
                  className={`flex items-center p-2 border ${buttonStyles(voteStatus[review._id] === 'upvotes', 'blue-600', 'blue-600')}`}
                  onClick={() => handleVote(review._id, 'upvotes')}
                  disabled={voteStatus[review._id] === 'downvotes'}
                >
                  <FaThumbsUp />
                </button>
                <button
                  className={`flex items-center p-2 border ${buttonStyles(voteStatus[review._id] === 'downvotes', 'red-600', 'red-600')}`}
                  onClick={() => handleVote(review._id, 'downvotes')}
                  disabled={voteStatus[review._id] === 'upvotes'}
                >
                  <FaThumbsDown />
                </button>
              </div>
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