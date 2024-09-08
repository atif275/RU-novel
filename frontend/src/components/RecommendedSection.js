import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { TbHexagonPlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Add icons for arrows

const RecommendedSection = () => {
  const [books, setBooks] = useState([]);
  const sliderRef = useRef(null); // Create a ref for the slider

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://api.ru-novel.ru/api/books');
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  // Responsive carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="mt-6 mb-6 bg-white p-[12px] pl-[20px] pb-[25px] relative"> {/* Add relative to position the buttons */}
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
          Recommended for you
        </h2>
      </div>

      {/* Left Arrow */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <FaArrowLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
        onClick={() => sliderRef.current.slickNext()}
      >
        <FaArrowRight size={20} />
      </button>

      <Slider {...settings} className="ml-3 mr-4" ref={sliderRef}>
        {books.map((book) => (
          <div key={book._id} className="">
            <div className="bg-white rounded-lg overflow-hidden h-[220px]">
              <img
                src={book.image}
                alt={book.title}
                className="mx-auto my-2"
                style={{ width: '100px', height: '150px' }}
              />
              <div className="p-2 text-center">
                <Link to={`/fiction/${book._id}/${book.title}`} className="text-sm font-semibold text-blue-700 hover:underline">
                  {book.title}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedSection;
