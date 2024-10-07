import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { TbHexagonPlus } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './slick-custom.css';  // Custom styles for dots

const RecommendedSection = () => {
  const [books, setBooks] = useState([]);
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Conditional styles based on theme, similar to advertisement background
  const sectionStyles = theme === 'dark'
    ? 'bg-[#333333] text-white' // Dark mode styles
    : 'bg-[#ffffff] text-black'; // Light mode styles

  const headingStyles = theme === 'dark'
    ? 'text-[#ffcc00]' // Yellow text for dark mode
    : 'text-[#e26a6a]'; // Red text for light mode

  return (
    <div className={`mt-6 mb-6 p-[12px] pl-[20px] pb-[25px] ${sectionStyles}`}>
      <div className="flex items-center mb-4 h-12 border-b border-gray-300">
        <TbHexagonPlus className={`${headingStyles} mr-2`} size={20} />
        <h2
          className={`recommended-heading font-bold text-[16px] uppercase ${headingStyles}`}
          style={{
            fontFamily: 'Open Sans, sans-serif',
            boxSizing: 'border-box',
          }}
        >
          Recommended for you
        </h2>
      </div>

      <Slider {...settings} className="ml-3 mr-5">
        {books.map((book) => (
          <div key={book._id}>
            <div className={`rounded-lg overflow-hidden h-[220px] ${sectionStyles}`}>
              <img
                src={book.image}
                alt={book.title}
                className="mx-auto my-2"
                style={{ width: '100px', height: '150px' }}
              />
              <div className="p-2 text-center">
                <Link 
                  to={`/fiction/${book._id}/${book.title}`} 
                  className="text-sm font-semibold hover:underline"
                  style={{ color: theme === 'dark' ? '#ffcc00' : '#007BFF' }} // Yellow for dark mode, blue for light mode
                >
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