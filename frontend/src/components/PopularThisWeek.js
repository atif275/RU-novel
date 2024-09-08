import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { TbHexagonPlus } from 'react-icons/tb';
import { FaStar, FaStarHalfAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import star and arrow icons
import { Link } from 'react-router-dom';

const PopularThisWeek = () => {
  const [books, setBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Keep track of the current slide
  const sliderRef = useRef(null); // Create a ref for the slider

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
    const rating = book.stats?.rating?.overall ? parseFloat(book.stats.rating.overall) : 0;
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

  // Function to render custom dots with dynamic behavior
  const renderCustomDots = (dots) => {
    const visibleDots = 5; // Max number of visible dots
    const totalDots = dots.length;
    let startIndex = Math.max(0, currentSlide - Math.floor(visibleDots / 2)); // Start from middle index
    let endIndex = Math.min(totalDots, startIndex + visibleDots); // Limit the end index
    if (endIndex === totalDots) {
      startIndex = Math.max(0, totalDots - visibleDots); // Adjust start if end exceeds
    }

    return (
      <ul className="slick-dots custom-dots">
        {dots.slice(startIndex, endIndex).map((dot, index) => (
          <li
            key={index}
            className={index + startIndex === currentSlide ? "slick-active" : ""}
            onClick={() => sliderRef.current.slickGoTo(index + startIndex)}
          >
            {dot.props.children}
          </li>
        ))}
      </ul>
    );
  };
  
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
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // Track slide changes
    appendDots: renderCustomDots, // Use custom dots rendering
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-white p-[12px] pl-[20px] pb-[25px] mb-6 relative"> {/* Add relative to position the buttons */}
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
            <div className="bg-white rounded-lg overflow-hidden h-[230px]">
              <img
                src={book.image}
                alt={book.title}
                className="mx-auto my-2 object-cover"
                style={{
                  width: '100px',
                  height: '150px',
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
