// src/components/LatestUpdates.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineAccessTime } from "react-icons/md";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import star icons
import { Link } from 'react-router-dom';

const LatestUpdates = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://api.ru-novel.ru/api/bookthreads');
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
    // Safely access nested properties
    const rating = book.stats && book.stats.rating ? parseFloat(book.stats.rating.overall) : 0;
    const stars = [];
    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Check if there is a half star
    const emptyStars = 5 - fullStars - halfStar; // Calculate the number of empty stars
  
    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      );
    }
  
    // Render a half star if needed
    if (halfStar) {
      stars.push(
        <FaStarHalfAlt key="half" className="text-yellow-500" />
      );
    }
  
    // Render empty stars with border effect
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaStar
          key={`empty-${i}`}
          className="text-gray-300"
        />
      );
    }
  
    return stars;
  };
  const handleImageError = (imagePath,e) => {
    if (!e.target.src.startsWith("../../../backend")) {
      e.target.src = `../../../backend${imagePath}`;
    }
  };

  return (
    <div className="w-full md:w-1/2 mb-4 md:mb-0">
      <div
        className="bg-white w-full"
        style={{
          margin: '0 0 25px',
          padding: '12px 20px 15px',
        }}
      >
        <div className="w-full" style={{ margin: '0 0 10px' }}>
          <div className="flex items-center mb-4 h-12 border-b border-gray-300">
            <MdOutlineAccessTime className="text-[#e26a6a] mr-2" size={20} />
            <h2
              className="recommended-heading text-[#e26a6a]"
              style={{
                fontFamily: 'Open Sans, sans-serif',
                boxSizing: 'border-box',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                color: '#e26a6a',
                fontSize: '16px',
              }}
            >
              Latest Updates
            </h2>
          </div>
          <div className="w-full" style={{ padding: '8px 0 0' }}>
          {Array.isArray(books) ? books.slice(0, 10).map((book, index) => (
              <div
                key={book._id}
                className="flex items-center bg-white p-4 w-full border-b border-gray-300 hover:bg-gray-100"
              >
                <div className="flex w-20 h-20 justify-center flex-shrink-0">
                  <div className="w-14 h-20 flex-shrink-0">
                    <img

                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(book.image, e)}
                    />
                  </div> 
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-[14px] font-bold text-[#e7505a] hover:underline" style={{fontFamily: 'Open Sans, sans-serif'}}>
                  <Link to={`/fiction/${book._id}/${book.title}`} className="text-sm font-semibold text-blue-700 hover:underline">
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
            )): (
              <p>Data is not available or is not in the expected format.</p>
            )}
          </div>
          <div className="w-full" style={{ padding: '15px 0' }}>
            <div className="flex justify-center">
              <button
                className="bg-[#e26a6a] text-white text-[14px] hover:bg-[#ff5c5c]"
                style={{
                  padding: '6px 12px',
                  width: '140px',
                  height: '36px',
                  fontFamily: 'Open Sans, sans-serif'
                }}
              >
                More Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
