import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useSelector } from 'react-redux'; // Import useSelector to get theme

const Statistics = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useSelector((state) => state.userData.theme); // Get the current theme

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-red-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-red-500" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-red-500" />);
    }

    return stars;
  };

  // Conditional styles based on theme
  const containerStyles = theme === 'dark'
    ? 'bg-gray-800 text-white'  // Dark mode background and text color
    : 'bg-white text-black';    // Light mode background and text color

  const toggleIconColor = theme === 'dark'
    ? 'text-white'   // White toggle icon for dark mode
    : 'text-black';  // Black toggle icon for light mode

  const statTextColor = theme === 'dark'
    ? 'text-gray-300'  // Text color for stats in dark mode
    : 'text-black';    // Text color for stats in light mode

  return (
    <div className={`w-full p-3 mb-4 ${containerStyles}`}>
      {/* Toggle Header */}
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={toggleOpen}
      >
        <span className="text-[14px] font-bold">STATISTICS</span>
        {isOpen ? (
          <FaChevronUp className={toggleIconColor} />
        ) : (
          <FaChevronDown className={toggleIconColor} />
        )}
      </div>

      {/* Statistics Details with Transition */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div className={`grid grid-cols-2 gap-4 p-4 font-bold text-[12px] md:text-[14px] ${statTextColor}`}>
          <div>
            <p>OVERALL SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.overall) || 0)}</div>
            <p>STYLE SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.style) || 0)}</div>
            <p>STORY SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.story) || 0)}</div>
            <p>GRAMMAR SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.grammar) || 0)}</div>
            <p>CHARACTER SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.character) || 0)}</div>
          </div>
          <div>
            <p>TOTAL VIEWS :</p>
            <p className="text-red-500">{stats.views || 'N/A'}</p>
            <p>FOLLOWERS :</p>
            <p className="text-red-500">{stats.followers || 'N/A'}</p>
            <p>PAGES :</p>
            <p className="text-red-500">{stats.pages || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;