// src/components/PopularThisWeek.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { TbHexagonPlus } from 'react-icons/tb';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Import star icons
import { Link } from 'react-router-dom';

const PopularThisWeek = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/bookthreads');
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
  
  // Responsive carousel settings
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Enable infinite scrolling
    speed: 500,
    slidesToShow: 5, // Default to 5 slides
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280, // Extra-large screens (xl)
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Large screens (lg)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Medium screens (md)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // Small screens (sm)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile screens (xs)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white p-[12px] pl-[20px] pb-[25px] mb-6">
      {/* Set carousel height */}
      <div className="flex items-center mb-4 h-12 border-b border-gray-300">
        <TbHexagonPlus className="text-[#e26a6a] mr-2" size={20} />
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
          Popular This Week
        </h2>
      </div>

      <Slider {...settings} className="ml-3 mr-4">
        {books.map((book) => (
          <div key={book._id} className="">
            {/* Use padding for margin effect */}
            <div className="bg-white rounded-lg overflow-hidden h-[230px]">
              {/* Set card height */}
              <img
                src={book.image}
                alt={book.title}
                className="mx-auto my-2 object-cover" /* Center image horizontally */
                style={{
                  width: '100px', /* Set image width */
                  height: '150px', /* Set image height */
                }}
              />
              <div className="flex justify-center items-center mt-1">
                {renderStars(book)}
              </div>
              <div className="p-2 text-center">
                <h3 className="text-sm font-semibold text-blue-700 hover:underline">
                <Link to={`/fiction/${book._id}/${book.title}`} className="text-sm font-semibold text-blue-700 hover:underline">
                  {book.title}
                </Link>
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularThisWeek;
