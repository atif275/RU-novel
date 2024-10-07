import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import star icons
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector for theme

const BestOngoing = () => {
  const [books, setBooks] = useState([]);
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://api.ru-novel.ru/api/bookthreads');
        const data = response.data;
        if (data.success && Array.isArray(data.data)) {
          setBooks(data.data); // Access the array inside the data object
        } else {
          console.error('Data is not an array or success flag is false:', data);
        }
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
  
    fetchBooks();
  }, []);

  // Function to render star ratings
  const renderStars = (book) => {
    const rating = book.stats && book.stats.rating ? parseFloat(book.stats.rating.overall) : 0;
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Check if there is a half star
    const emptyStars = 5 - fullStars - halfStar; // Calculate the number of empty stars

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      );
    }

    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-500" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar key={`empty-${i}`} className="text-gray-300" />
      );
    }

    return stars;
  };

  // Conditional styles based on theme
  const sectionStyles = theme === 'dark'
    ? 'bg-[#333333] text-white' // Dark mode background and text
    : 'bg-white text-black'; // Light mode background and text

    const hoverStyles = theme === 'dark'
    ? 'hover:bg-[#222222] text-white' // Dark mode styles
    : 'hover:bg-gray-100 text-black'; // Light mode styles (default)

  const headingStyles = theme === 'dark'
    ? 'text-[#ffcc00]' // Yellow text for dark mode
    : 'text-[#e26a6a]'; // Red text for light mode

  const buttonStyles = theme === 'dark'
    ? 'bg-[#ffcc00] text-black hover:bg-[#ffd700]' // Button for dark mode
    : 'bg-[#e26a6a] text-white hover:bg-[#ff5c5c]'; // Button for light mode

  return (
    <div className="w-full md:pl-3">
      <div
        className={`w-full ${sectionStyles}`}
        style={{
          margin: '0 0 25px',
          padding: '12px 20px 15px',
        }}
      >
        <div className="w-full" style={{ margin: '0 0 10px' }}>
          <div className="flex items-center mb-4 h-12 border-b border-gray-300">
            <MdOutlinePlayCircleFilled className={`${headingStyles} mr-2`} size={20} />
            <h2
              className={`recommended-heading font-bold text-[16px] uppercase ${headingStyles}`}
              style={{
                fontFamily: 'Open Sans, sans-serif',
                boxSizing: 'border-box',
              }}
            >
              Best Ongoing
            </h2>
          </div>
          <div className="w-full" style={{ padding: '8px 0 0' }}>
            {Array.isArray(books) ? books.slice(0, 10).map((book, index) => (
              <div
                key={book._id}
                className={`flex items-center p-4 w-full border-b border-gray-300 ${hoverStyles} ${sectionStyles}`}
              >
                <div className="flex min-w-10 md:min-w-20 h-20 ml-[-20px] justify-center items-center">
                  <span className="text-[16px] hover:underline" style={{fontFamily: 'Open Sans, sans-serif', color: theme === 'dark' ? '#ffcc00' : '#e7505a'}}>
                    #{index + 1}
                  </span>
                </div>
                <div className="flex w-20 h-20 justify-center flex-shrink-0">
                  <div className="w-14 h-20 flex-shrink-0">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-[14px] font-bold hover:underline" style={{ fontFamily: 'Open Sans, sans-serif', color: theme === 'dark' ? '#ffcc00' : '#e7505a' }}>
                    <Link to={`/fiction/${book._id}/${book.title}`} className="text-sm font-semibold hover:underline"
                      style={{ color: theme === 'dark' ? '#ffcc00' : '#007BFF' }}>
                      {book.title}
                    </Link>
                  </h3>
                  <div className="flex items-center">
                    {renderStars(book)}
                  </div>
                  <p className="text-sm text-gray-500">
                    Followers: {book.stats && book.stats.followers ? `${book.stats.followers} followers` : 0}
                  </p>
                </div>
              </div>
            )) : (
              <p>Data is not available or is not in the expected format.</p>
            )}
          </div>
          <div className="w-full" style={{ padding: '15px 0' }}>
            <div className="flex justify-center">
              <Link to="/fictions/active-popular">
                <button
                  className={`${buttonStyles} text-[14px]`}
                  style={{
                    padding: '6px 12px',
                    width: '140px',
                    height: '36px',
                    fontFamily: 'Open Sans, sans-serif'
                  }}
                >
                  More Fictions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestOngoing;