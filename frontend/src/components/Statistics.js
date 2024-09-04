import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Statistics = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className="w-full bg-white p-3 mb-4">
      {/* Toggle Header */}
      <div
        className="flex justify-between items-center p-2 cursor-pointer"
        onClick={toggleOpen}
      >
        <span className="text-black text-[14px] font-bold">STATISTICS</span>
        {isOpen ? (
          <FaChevronUp className="text-black" />
        ) : (
          <FaChevronDown className="text-black" />
        )}
      </div>

      {/* Statistics Details with Transition */}
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div className="grid grid-cols-2 gap-4 p-4 text-black font-bold text-[12px] md:text-[14px]">
          <div>
            <p className="font-bold">OVERALL SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.overall) || 0)}</div>
            <p className="font-bold">STYLE SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.style) || 0)}</div>
            <p className="font-bold">STORY SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.story) || 0)}</div>
            <p className="font-bold">GRAMMAR SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.grammar) || 0)}</div>
            <p className="font-bold">CHARACTER SCORE</p>
            <div className="flex">{renderStars(parseFloat(stats.rating.character) || 0)}</div>
          </div>
          <div>
            <p className="font-bold">TOTAL VIEWS :</p>
            <p className="text-red-500">{stats.views || 'N/A'}</p>
            {/* Commented out as these are not in the schema */}
            {/* <p className="font-bold">AVERAGE VIEWS :</p>
            <p className="text-red-500">N/A</p> */}
            <p className="font-bold">FOLLOWERS :</p>
            <p className="text-red-500">{stats.followers || 'N/A'}</p>
            {/* Commented out as these are not in the schema */}
            {/* <p className="font-bold">FAVORITES :</p>
            <p className="text-red-500">N/A</p>
            <p className="font-bold">RATINGS :</p>
            <p className="text-red-500">N/A</p> */}
            <p className="font-bold">PAGES :</p>
            <p className="text-red-500">{stats.pages || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
